import React, { Component } from "react";
import { BarChart } from "../bar-chart/BarChart";
import { FindUserLocation } from "../find-user-location/FindUserLocation";

export class CityStatistics extends Component {
  render() {
    return (
      <div className="statistics-box">
        <h2 className="statistics-box__header">
        	CITY
        	<FindUserLocation handleClick={this.props.handleClick} />
        </h2>
        
        <BarChart values={this.props.crimesByCity} />
      </div>
    );
  }
}
CityStatistics.defaultProps = {
  crimesByCity: [],
};
