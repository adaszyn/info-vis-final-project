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
    const className = entry.selected
      ? "bar-chart-container__bar bar-chart-container_clicked__bar"
      : "bar-chart-container__bar";
    return (
      <div
        className={className}
        id={entry.id}
        style={style}
        key={`${entry.label}-${entry.value}`}
        onClick={() => this.props.onBarClick(entry)}
      >
        <span id={entry.id}>{entry.label}</span>
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
BarChart.defaultProps = {
  onBarClick: () => {},
};
BarChart.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.number,
    }),
  ),
};
