import React, { Component } from "react";
import { RangePicker } from "../range-picker/RangePicker";

export class TimeStatistics extends Component {
  constructor() {
    super();
    this.state = {
      value: { min: 10, max: 100 }
    };
  }
  onValueChange = value => {
    this.setState({ value });
  };
  render() {
    return (
      <div className="statistics-box">
        <h2 className="statistics-box__header">TIME</h2>
        <RangePicker minValue={10} maxValue={100} value={this.state.value} onChange={this.onValueChange} />
      </div>
    );
  }
}
