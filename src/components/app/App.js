import React, { Component } from 'react';
import _ from 'underscore';
import { CrimeMap } from '../crime-map/CrimeMap';
import { Statistics } from '../statistics/Statistics';
import {
  fetchCrimes,
  fetchAggregatedCrimeTypes,
  fetchAggregatedCities,
  fetchAggregatedRegions,
  fetchAggregatedHours,
  fetchAggregatedMonths,
} from '../../util/api';
import './App.css';

export class App extends Component {
  constructor() {
    super();
    this.boundingBox = {
      sw: {
        lng: -50.38297162496275,
        lat: 48.31125180222088,
      },
      ne: {
        lng: 81.98030962503356,
        lat: 72.05983593722306,
      },
    };
    this.state = {
      timeRange: ['22/05/2017', '23/06/2017'],
      crimes: [],
      crimesByType: [],
      crimesByCity: [],
      crimesByRegion: [],
      hourlyDistribution: _.range(0, 24).map(v => 0),
      hourRange: {
        min: 1,
        max: 6,
      },
      monthlyDistribution: {
        values: [],
        labels: [],
      },
      selectedCrime: null,
    };
    this.mapCenter = [15.798669, 62.450588];
    this.mapZoom = [3];
  }

  onTimeRangeChange = timeRange => {
    this.setState({
      timeRange,
    });
    this.fetchCrimesWithDelay();
  };
  onHourRangeChange = hourRange => {
    this.setState({ hourRange }, this.fetchCrimesWithDelay);
  };
  onCrimeSelected = crime => {
    this.setState({
      selectedCrime: crime,
    });
  };
  fetchCrimesWithDelay = _.debounce(() => {
    fetchCrimes({
      startDate: this.state.timeRange[0],
      endDate: this.state.timeRange[1],
      boundingBox: this.boundingBox,
      startHour: this.state.hourRange.min,
      endHour: this.state.hourRange.max,
    })
      .then(crimes => {
        this.setState({ crimes, selectedCrime: crimes[0] });
      })
      .catch(error => {
        console.error(error);
      });
    fetchAggregatedCrimeTypes({
      startDate: this.state.timeRange[0],
      endDate: this.state.timeRange[1],
      boundingBox: this.boundingBox,
      startHour: this.state.hourRange.min,
      endHour: this.state.hourRange.max,
    })
      .then(data => {
        this.setState({
          crimesByType: data.map(entry => ({
            label: entry.title,
            value: entry.count,
          })),
        });
      })
      .catch(error => {
        console.error(error);
      });
    fetchAggregatedCities({
      startDate: this.state.timeRange[0],
      endDate: this.state.timeRange[1],
      boundingBox: this.boundingBox,
      startHour: this.state.hourRange.min,
      endHour: this.state.hourRange.max,
    })
      .then(data => {
        this.setState({
          crimesByCity: data.map(entry => ({
            label: entry.title,
            value: entry.count,
          })),
        });
      })
      .catch(error => {
        console.error(error);
      });
    fetchAggregatedRegions({
      startDate: this.state.timeRange[0],
      endDate: this.state.timeRange[1],
      boundingBox: this.boundingBox,
      startHour: this.state.hourRange.min,
      endHour: this.state.hourRange.max,
    })
      .then(data => {
        this.setState({
          crimesByRegion: data.map(entry => ({
            label: entry.title,
            value: entry.count,
          })),
        });
      })
      .catch(error => {
        console.error(error);
      });
    fetchAggregatedHours({
      startDate: this.state.timeRange[0],
      endDate: this.state.timeRange[1],
      boundingBox: this.boundingBox,
    })
      .then(data => {
        this.setState({
          hourlyDistribution: data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }, 1500);
  onBoundingBoxChange = ({ ne, sw }) => {
    this.boundingBox.sw = sw;
    this.boundingBox.ne = ne;
    this.fetchCrimesWithDelay();
  };
  componentDidMount() {
    this.fetchCrimesWithDelay();
    fetchAggregatedMonths({
      startDate: '13/10/2016',
      endDate: '14/02/2018',
      boundingBox: this.boundingBox,
    })
      .then(data => {
        this.setState({
            monthlyDistribution: data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getLocation = () => {
    var location = new Promise(resolve => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          resolve(position);
        });
      }
    });
    return location;
  };

  handleClick = () => {
    this.getLocation().then(position => {
      this.mapCenter = [position.coords.longitude, position.coords.latitude];
      this.mapZoom = [10];
      this.onBoundingBoxChange(this.boundingBox);
    });
  };

  onCrimeDeselect = () => {
    this.setState({
      selectedCrime: null,
    });
  };

  render() {
    return (
      <div className="container">
        <CrimeMap
          onBoundingBoxChange={this.onBoundingBoxChange}
          crimes={this.state.crimes}
          onRender={this.onBoundingBoxChange}
          center={this.mapCenter}
          zoom={this.mapZoom}
          onCrimeSelected={this.onCrimeSelected}
          selectedCrime={this.state.selectedCrime}
          onCrimeDeselect={this.onCrimeDeselect}
        />
        <Statistics
          crimesByType={this.state.crimesByType}
          crimesByCity={this.state.crimesByCity}
          crimesByRegion={this.state.crimesByRegion}
          timeRange={this.state.timeRange}
          hourlyDistribution={this.state.hourlyDistribution}
          monthlyDistribution={this.state.monthlyDistribution}
          timeRangeSpan={['01/11/2016', '01/02/2018']}
          onTimeRangeChange={this.onTimeRangeChange}
          hourRange={this.state.hourRange}
          onHourRangeChange={this.onHourRangeChange}
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}

export default App;
