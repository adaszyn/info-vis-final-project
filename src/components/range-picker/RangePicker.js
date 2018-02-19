import React, { Component } from "react";
import InputRange from "react-input-range";
import "./RangePicker.css";

export class RangePicker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <InputRange
        maxValue={this.props.maxValue}
        minValue={this.props.minValue}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}
