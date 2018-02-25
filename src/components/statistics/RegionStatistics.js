import React, { Component } from 'react';
import { BarChart } from '../bar-chart/BarChart';
import { FindUserLocation } from '../find-user-location/FindUserLocation';

export class RegionStatistics extends Component {
  render() {
    return (
      <div className="statistics-box">
        <h2 className="statistics-box__header">REGION</h2>
        <FindUserLocation handleClick={this.props.handleClick}/>
        <BarChart values={this.props.crimesByRegion} />        
      </div>
    );
  }
}

RegionStatistics.defaultProps = {
    crimesByRegion: []
}