import React, { Component } from "react";
import { BarChart } from "../bar-chart/BarChart";
import { FindUserLocation } from "../find-user-location/FindUserLocation";
import { getTranslatedHeading } from "../../util/headings";
import { getCityPosition } from "../../util/cities";

export class CityStatistics extends Component {
  onCityClicked = (e) => {
    var target = e.target;
    var city_name = target.tagName === "SPAN"? target.innerHTML :
      target.className === "bar-chart-container__bar"? target.children[0].innerHTML : "";
    this.props.onCitySelected(getCityPosition(city_name));
  }
  getRealCities = () => {
    return this.props.crimesByCity.filter(city => getCityPosition(city.label));
  };
  render() {
    return (
      <div className="statistics-box" onClick={this.onCityClicked}>
        <h2 className="statistics-box__header">
        	{getTranslatedHeading("city", this.props.language)}
        	<FindUserLocation handleClick= {this.props.handleClick}
            buttonName = {getTranslatedHeading("my_location", this.props.language)} />
        </h2>
        
        <BarChart values={this.getRealCities()} />
      </div>
    );
  }
}
CityStatistics.defaultProps = {
  crimesByCity: [],
};
