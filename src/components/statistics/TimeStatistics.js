import React, { Component } from "react";
import { RangePicker } from "../range-picker/RangePicker";

export class TimeStatistics extends Component {
  onValueChange = value => {
    this.setState({ value });
  };
  render() {
    return (
      <div className="statistics-box">
        <h2 className="statistics-box__header">PERIOD</h2>
        <RangePicker
            minValue={2005}
            maxValue={2017}
            step={1}
            value={this.props.value}
            onChange={this.props.onChange} />
      </div>
    );
  }
}
