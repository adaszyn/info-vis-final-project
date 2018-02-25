import React, { Component } from "react";
import { CityStatistics } from "./CityStatistics";
import { RegionStatistics } from "./RegionStatistics";
import { CrimeTypeStatistics } from "./CrimeTypeStatistics";
import { TimeStatistics } from "./TimeStatistics";
import "./Statistics.css";

export class Statistics extends Component {
  render() {
    return (
      <div className="statistics-container">
        <RegionStatistics crimesByRegion={this.props.crimesByRegion} handleClick={this.props.handleClick}/>
        <CityStatistics crimesByCity={this.props.crimesByCity} />
        <CrimeTypeStatistics crimesByType={this.props.crimesByType} />
        <TimeStatistics
            timeRange={this.props.timeRange}
            timeRangeSpan={this.props.timeRangeSpan}
            hourlyDistribution={this.props.hourlyDistribution}
            monthlyDistribution={this.props.monthlyDistribution}
            hourRange={this.props.hourRange}
            onHourRangeChange={this.props.onHourRangeChange}
            onChange={this.props.onTimeRangeChange} />
      </div>
    );
  }
}
