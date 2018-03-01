import React, { Component } from "react";
import { BarChart } from "../bar-chart/BarChart";
import { FindUserLocation } from "../find-user-location/FindUserLocation";

export class CityStatistics extends Component {
  onCityClicked = (e) => {
    var target = e.target;
    var city_name = target.tagName === "SPAN"? target.innerHTML :
      target.className === "bar-chart-container__bar"? target.children[0].innerHTML : "";
    this.props.onCitySelected(city_name);
  }
  render() {
    return (
      <div className="statistics-box" onClick={this.onCityClicked}>
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
