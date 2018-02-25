import React, { Component } from "react";
import { BarChart } from "../bar-chart/BarChart";
import { getTranslatedCrimeType } from "../../util/crimes";

export class CrimeTypeStatistics extends Component {
  getTranslatedCrimes = () => {
    return this.props.crimesByType.map(crime => ({
      ...crime,
      label: getTranslatedCrimeType(crime.label, this.props.language),
    }));
  };
  render() {
    return (
      <div className="statistics-box">
        <h2 className="statistics-box__header">CRIME TYPE</h2>
        <BarChart values={this.getTranslatedCrimes()} />
      </div>
    );
  }
}

CrimeTypeStatistics.defaultProps = {
  crimesByType: [],
};
