import React, { Component } from "react";
import { BarChart } from "../bar-chart/BarChart";
import { getTranslatedHeading } from "../../util/headings";

export class RegionStatistics extends Component {
  onRegionClicked = e => {
    var target = e.target;
    var region_name =
      target.tagName === "SPAN"
        ? target.innerHTML
        : target.className === "bar-chart-container__bar"
          ? target.children[0].innerHTML
          : "";
    this.props.onRegionSelected(region_name);
  };
  render() {
    return (
      <div className="statistics-box" onClick={this.onRegionClicked}>
        <h2 className="statistics-box__header">
          {getTranslatedHeading("region", this.props.language)}
        </h2>
        <BarChart values={this.props.crimesByRegion} />
      </div>
    );
  }
}

RegionStatistics.defaultProps = {
  crimesByRegion: [],
};
