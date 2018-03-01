import React, { Component } from "react";
import { BarChart } from "../bar-chart/BarChart";
import { getTranslatedCrimeType } from "../../util/crimes";

export class CrimeTypeStatistics extends Component {
  getTranslatedCrimes = () => {
    return this.props.crimesByType.map(crime => ({
      ...crime,
      label: getTranslatedCrimeType(crime.label, this.props.language),
      id: crime.label,
    }));
  };

  render() {
    return (
      <div className="statistics-box">
        <h2 className="statistics-box__header">CRIME TYPE</h2>
        <BarChart values={this.getTranslatedCrimes()}
        selectedCrimeType={this.props.selectedCrimeType}
        onCrimeTypeSelected={this.props.onCrimeTypeSelected}/>
      </div>
    );
  }
}

CrimeTypeStatistics.defaultProps = {
  crimesByType: [],
};
