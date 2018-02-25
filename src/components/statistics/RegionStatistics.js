import React, { Component } from "react";
import { BarChart } from "../bar-chart/BarChart";

export class RegionStatistics extends Component {
  render() {
    return (
      <div className="statistics-box">
        <h2 className="statistics-box__header">REGION</h2>
        <BarChart values={this.props.crimesByRegion} />
      </div>
    );
  }
}

RegionStatistics.defaultProps = {
  crimesByRegion: [],
};
