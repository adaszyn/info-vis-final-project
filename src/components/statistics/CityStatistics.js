import React, { Component } from 'react';
import { BarChart } from '../bar-chart/BarChart';

export class CityStatistics extends Component {
  render() {
    return (
      <div className="statistics-box">
        <h2 className="statistics-box__header">CITY</h2>
        <BarChart values={this.props.crimesByCity} />
      </div>
    );
  }
}

