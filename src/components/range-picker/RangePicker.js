import React, { Component } from "react";
import InputRange from "react-input-range";
import "./RangePicker.css";

export class RangePicker extends Component {
  render() {
    return <InputRange {...this.props} />;
  }
}
