import React, { Component } from "react";
import { scaleLinear, min, max } from "d3";
import PropTypes from "prop-types";
import "./BarChart.css";

export class BarChart extends Component {
  constructor(props) {
    super(props);
    this.percentageScale = scaleLinear();
    this.recalculateScale(props.values);
  }

  recalculateScale = values => {
    const numericalValues = values.map(entry => entry.value);
    this.percentageScale = this.percentageScale
      .domain([min(numericalValues), max(numericalValues)])
      .range([0, 100]);
  };
  componentWillReceiveProps({ values }) {
    this.recalculateScale(values);
  }

  renderBar = entry => {
    const style = {
      width: this.percentageScale(entry.value) + "%",
      backgroundColor: entry.color,
    };
    return (
      <div
        className="bar-chart-container__bar"
        style={style}
        key={`${entry.label}-${entry.value}`}
      >
        <span>{entry.label}</span>
      </div>
    );
  };
  render() {
    return (
      <div className="bar-chart-container">
        {this.props.values.map(this.renderBar)}
      </div>
    );
  }
}
BarChart.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.number,
    }),
  ),
};
