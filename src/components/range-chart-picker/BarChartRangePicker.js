import React, { Component } from "react";
import { max, min, scaleLinear } from "d3";
import moment from "moment";
import InputRange from "react-input-range";

import "./ChartRangePicker.css";

export class BarChartRangePicker extends Component {
  constructor(props) {
    super(props);
    this.percentageScale = scaleLinear();
    this.adjustScale(props);

    
  }

  adjustScale = props => {
    this.percentageScale = this.percentageScale
      .range([0, 100])
      .domain([min(props.values), max(props.values)]);
  };

  renderBar = (value, index) => {
    const style = {
      height: this.percentageScale(value) + "%",
      minWidth: 100 / this.props.values.length + "%",
    };
    const fillStyle = {
      opacity: index >= this.props.hourRange.min && index < this.props.hourRange.max
      ? 1.0
      : 0.4
    }
    return <div key={`graph-bar-${index}`}className="bar-chart-range__bar" style={style}>
      <div style={fillStyle} className="bar-chart-range__bar-fill"></div>
    </div>;
  };

  componentWillReceiveProps(newProps) {
    this.adjustScale(newProps);
  }
  onMouseMove = (event) => {
    if (!this.handlePressed) {
        return;
    }
    console.log(event)
  };
  onRangeMouseDown = () => {
      this.handlePressed = true;
  };
  onMouseUp = () => {
    this.handlePressed = false;

  };
  formatRangeValue = (value, type) => {
    if (type !== 'max' && type !== 'min') {
      return moment(value, 'HH').format("hh A")
    }
  }
  render() {
    return (
      <div className="chart-range-picker-container bar-chart-range">
        <div className="bars-container">
          {this.props.values.map(this.renderBar)}
        </div>
        <InputRange
          minValue={min(this.props.domain)}
          maxValue={max(this.props.domain) + 1}
          step={1}
          formatLabel={this.formatRangeValue}
          value={this.props.hourRange}
          onChange={this.props.onHourRangeChange} />
      </div>
    );
  }
}
