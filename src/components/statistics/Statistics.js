import React, { Component } from "react";
import { CityStatistics } from "./CityStatistics";
import { RegionStatistics } from "./RegionStatistics";
import { CrimeTypeStatistics } from "./CrimeTypeStatistics";
import { TimeStatistics } from "./TimeStatistics";
import './Statistics.css';

export class Statistics extends Component {
  render() {
    return (
      <div className="statistics-container">
        <RegionStatistics />
        <CityStatistics />
        <CrimeTypeStatistics />
        <TimeStatistics />
      </div>
    );
  }
}
