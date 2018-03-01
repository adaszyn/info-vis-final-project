import React, { Component } from "react";
import { CityStatistics } from "./CityStatistics";
import { RegionStatistics } from "./RegionStatistics";
import { CrimeTypeStatistics } from "./CrimeTypeStatistics";
import { TimeStatistics } from "./TimeStatistics";
import "./Statistics.css";
import { LoadingComponent } from "../loading-component/LoadingComponent";

export class Statistics extends Component {
  render() {
    if(this.props.isStatisticBarHidden){
      return('');
    }
    return (
      <div className="statistics-container">
        <LoadingComponent
          data={this.props.crimesByRegion}
          onRegionSelected = {this.props.onRegionSelected}
          wrappedComponent={RegionStatistics}
          dataLabel="crimesByRegion"
          containerClassName="statistics-box-loader-container"
        />
        <LoadingComponent
          data={this.props.crimesByCity}
          onCitySelected = {this.props.onCitySelected}
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
