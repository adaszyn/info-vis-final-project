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

  onClicked = e => {
    if (this.props.selectedCrimeType && e.target.id) {
      this.props.onCrimeTypeSelected(e.target.id);
    }
  };

  renderBar = entry => {
    const style = {
      width: this.percentageScale(entry.value) + "%",
      backgroundColor: entry.color,
    };
    var className_selected;
    if (
      !this.props.selectedCrimeType ||
      this.props.selectedCrimeType.indexOf(entry.id) == -1
    ) {
      className_selected = "bar-chart-container__bar";
      if (entry.color) {
        className_selected += " bar-chart-container_colour__bar";
      }
    } else {
      className_selected =
        "bar-chart-container__bar bar-chart-container_clicked__bar";
    }
    return (
      <div
        className={className_selected}
        id={entry.id}
        style={style}
        key={`${entry.label}-${entry.value}`}
        onClick={this.onClicked}
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
BarChart.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.number,
    }),
  ),
};
