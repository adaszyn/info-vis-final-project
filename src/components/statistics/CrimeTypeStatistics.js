import React, { Component } from 'react';
import { BarChart } from '../bar-chart/BarChart';

export class CrimeTypeStatistics extends Component {
  render() {
    return (
      <div className="statistics-box">
        <h2 className="statistics-box__header">CRIME TYPE</h2>        
        <BarChart values={this.props.crimesByType} />
                
      </div>
    );
  }
}

