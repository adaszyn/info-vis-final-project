import React, { Component } from "react";
import { select,curveCardinal, max, min, scaleLinear, line, curveBundle } from "d3";
import moment from "moment";
import InputRange from "react-input-range";

import "./ChartRangePicker.css";

export class SplineChartRangePicker extends Component {
  constructor(props) {
    super(props);
    this.percentageScale = scaleLinear();
    this.adjustScale(props);
    this.svgElement = this.svgElement;
  }

  adjustScale = props => {
    this.percentageScale = this.percentageScale
      .range([0, 100])
      .domain([min(props.values), max(props.values)]);
  };

  renderBar = (value, index) => {
    const style = {
      height: this.percentageScale(value) + "%",
      minWidth: 100 / this.props.values.length + "%"
    };
    const fillStyle = {
      opacity:
        index >= this.props.hourRange.min && index < this.props.hourRange.max
          ? 1.0
          : 0.4
    };
    return (
      <div
        key={`graph-bar-${index}`}
        className="bar-chart-range__bar"
        style={style}
      >
        <div style={fillStyle} className="bar-chart-range__bar-fill" />
      </div>
    );
  };

  componentWillReceiveProps(newProps) {
    this.adjustScale(newProps);
  }
  formatRangeValue = (value, type) => {
    if (type !== "max" && type !== "min") {
      return moment(value, "HH").format("hh A");
    }
  };
  componentWillReceiveProps() {}
  render() {
      const data = this.props.domain.reduce((zipped, x, i) => [...zipped, {x, y: this.props.values[i]}], [])
    var lineFunction = line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(curveCardinal)
    //   .curve(curveBundle());
    console.log(lineFunction);
    if (this.svgElement) {
        select(this.svgElement).html(null)
        select(this.svgElement)
        .append("path")
        .attr("d", lineFunction(data))
        .attr("stroke", "white")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("stroke-width", 1)
        .attr("fill", "none");
    }

    return (
      <div className="chart-range-picker-container bar-chart-range">
        <svg
          className="bars-container"
          preserveAspectRatio="none"
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          ref={svgElement => (this.svgElement = svgElement)}
        />
        <InputRange
          minValue={min(this.props.domain)}
          maxValue={max(this.props.domain) + 1}
          step={1}
          formatLabel={this.formatRangeValue}
          value={this.props.hourRange}
          onChange={this.props.onHourRangeChange}
        />
      </div>
    );
  }
}
