import React, { Component } from "react";
import { CityStatistics } from "./CityStatistics";
import { RegionStatistics } from "./RegionStatistics";
import { CrimeTypeStatistics } from "./CrimeTypeStatistics";
import { TimeStatistics } from "./TimeStatistics";
import "./Statistics.css";

export class Statistics extends Component {
  constructor() {
    super();
    this.state = {
      timeRange: { min: 2007, max: 2010 }
    };
  }
  onRangeChange = timeRange => {
    this.setState({
      timeRange
    });
  };

  render() {
    return (
      <div className="statistics-container">
        <RegionStatistics />
        <CityStatistics />
        <CrimeTypeStatistics />
        <TimeStatistics
            value={this.state.timeRange}
            onChange={this.onRangeChange} />
      </div>
    );
  }
}
