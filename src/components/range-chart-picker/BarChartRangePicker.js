import React, { Component } from "react";
import { max, min, scaleLinear } from "d3";
import InputRange from "react-input-range";

import "./ChartRangePicker.css";

export class BarChartRangePicker extends Component {
  constructor(props) {
    super(props);
    this.percentageScale = scaleLinear();
    this.adjustScale(props);
    this.handlePressed = false;
    this.state = {
        range: {
            min: 1,
            max: 6,
        }
    }
    
  }
  componentDidMount () {
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('mouseup', this.onMouseUp)
  }
  componentWillUnmount () {
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('mouseup', this.onMouseUp)

  }

  adjustScale = props => {
    this.percentageScale = this.percentageScale
      .range([0, 100])
      .domain([min(props.values), max(props.values)]);
  };

  renderBar = value => {
    const style = {
      height: this.percentageScale(value) + "%",
      minWidth: 100 / this.props.values.length + "%"
    };
    return <div className="bar-chart-range__bar" style={style} />;
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
  render() {
    return (
      <div className="chart-range-picker-container bar-chart-range">
        {/* <div className="range-handle" />
        <div
          className="range-handle"
          onMouseDown={this.onRangeMouseDown}
        /> */}
        <div className="bars-container">
          {this.props.values.map(this.renderBar)}
        </div>
        <InputRange
          minValue={min(this.props.domain)}
          maxValue={max(this.props.domain)}
          step={1}
          value={this.state.range}
          onChange={range => this.setState({range})} />
      </div>
    );
  }
}
