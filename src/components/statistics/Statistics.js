import React, { Component } from "react";
import { CityStatistics } from "./CityStatistics";
import { RegionStatistics } from "./RegionStatistics";
import { CrimeTypeStatistics } from "./CrimeTypeStatistics";
import { TimeStatistics } from "./TimeStatistics";
import { LoadingComponent } from "../loading-component/LoadingComponent";
import { ToggleBar } from "../toggle-bar/ToggleBar";
import "./Statistics.css";

export class Statistics extends Component {
  render() {
    const className = this.props.isStatisticBarHidden
        ? "statistics-container statistics-container--hidden" 
        : "statistics-container";

    return (
      <div className={className}>
        <ToggleBar
          toggleStatisticsBar={this.props.toggleStatisticsBar}
          isStatisticBarHidden={this.props.isStatisticBarHidden}
          timeRange={this.props.timeRange}
          hourRange={this.props.hourRange}
        />
        <LoadingComponent
          data={this.props.crimesByRegion}
          onRegionSelected={this.props.onRegionSelected}
          wrappedComponent={RegionStatistics}
          dataLabel="crimesByRegion"
          containerClassName="statistics-box-loader-container"
        />
        <LoadingComponent
          data={this.props.crimesByCity}
          onCitySelected={this.props.onCitySelected}
          wrappedComponent={CityStatistics}
          dataLabel="crimesByCity"
          handleClick={this.props.handleClick}
          containerClassName="statistics-box-loader-container"
        />
        <LoadingComponent
          data={this.props.crimesByType}
          selectedCrimeType={this.props.selectedCrimeType}
          onCrimeTypeSelected={this.props.onCrimeTypeSelected}
          wrappedComponent={CrimeTypeStatistics}
          dataLabel="crimesByType"
          containerClassName="statistics-box-loader-container"
          language={this.props.language}
        />
        <TimeStatistics
          timeRange={this.props.timeRange}
          timeRangeSpan={this.props.timeRangeSpan}
          hourlyDistribution={this.props.hourlyDistribution}
          monthlyDistribution={this.props.monthlyDistribution}
          hourRange={this.props.hourRange}
          onHourRangeChange={this.props.onHourRangeChange}
          onChange={this.props.onTimeRangeChange}
        />
      </div>
    );
  }
}
