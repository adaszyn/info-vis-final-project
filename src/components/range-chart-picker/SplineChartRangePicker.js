import React, { Component } from "react";
import {
  select,
  curveCardinal,
  max,
  min,
  scaleLinear,
  line,
  curveBundle,
  curveCardinalClosed
} from "d3";
import moment from "moment";
import { range } from "underscore";
import InputRange from "react-input-range";

import "./ChartRangePicker.css";

export class SplineChartRangePicker extends Component {
  constructor(props) {
    super(props);
    this.xScale = scaleLinear();
    this.yScale = scaleLinear();
    this.adjustScale(props);
    this.svgElement = this.svgElement;
  }

  adjustScale = props => {
    const { values, labels } = props.montlyDistribution;
    const domain = range(labels.length);
    this.xScale = this.xScale.range([5, 95]).domain([min(domain), max(domain)]);
    this.yScale = this.yScale.range([5, 95]).domain([min(values), max(values)]);
  };

  renderBar = (value, index) => {
    const { values, labels } = this.props.montlyDistribution;
    const style = {
      height: this.percentageScale(value) + "%",
      minWidth: 100 / values.length + "%"
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
    if (type === "max" || type === "min") {
        console.log(this.props.montlyDistribution.labels)
      return this.props.montlyDistribution.labels[value];
    }
  };
  render() {
    const { values, labels } = this.props.montlyDistribution;
    const domain = range(labels.length);
    const data = domain.reduce(
      (zipped, x, i) => [
        ...zipped,
        { x: this.xScale(x), y: 100 - this.yScale(values[i]) }
      ],
      [{ x: 0, y: 100 }]
    );
    data.push({ x: 100, y: 100 });

    var lineFunction = line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(curveCardinalClosed);
    //   .curve(curveBundle());
    if (this.svgElement) {
      select(this.svgElement).html(null);
      select(this.svgElement)
        .append("path")
        .attr("d", lineFunction(data))
        .attr("stroke", "#9fa6b7")
        .attr("stroke-width", 1)
        .attr("fill", "#9fa6b7");
    }
    const domainLength = domain.length;
    const leftOverlayStyle = {
      width: `${100 * this.props.hourRange.min / domainLength}%`,
      left: 0,
      top: 0
    };
    const rightOverlayStyle = {
      width: `${100 *
        (domainLength - this.props.hourRange.max) /
        domainLength}%`,
      left: `${100 * this.props.hourRange.max / domainLength}%`,
      top: 0
    };
    return (
      <div className="chart-range-picker-container bar-chart-range">
        {/* <div
          style={leftOverlayStyle}
          className="chart-range-picker-overlay chart-range-picker-overlay__left"
        />
        <div
          style={rightOverlayStyle}
          className="chart-range-picker-overlay chart-range-picker-overlay__left"
        /> */}
        <svg
          className="bars-container"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          width="100%"
          ref={svgElement => (this.svgElement = svgElement)}
        />
        {/* <InputRange
          minValue={min(domain)}
          maxValue={max(domain) + 1}
          step={1}
          formatLabel={this.formatRangeValue}
          value={{min:0, max: 0}}
          onChange={() => {}}
        /> */}
        <div className="chart-range-picker-container-labels">
            {this.props.montlyDistribution.labels.map(label =>
                 <span key={label}>{label}</span>)}
        </div>

      </div>
    );
  }
}
