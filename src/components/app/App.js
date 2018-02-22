import React, { Component } from "react";
import _ from "underscore";
import { CrimeMap } from "../crime-map/CrimeMap";
import { Header } from "../header/Header";
import { Statistics } from "../statistics/Statistics";
import {
  fetchCrimes,
  fetchAggregatedCrimeTypes,
  fetchAggregatedCities,
  fetchAggregatedRegions,
  fetchAggregatedHours,
} from "../../util/api";
import "./App.css";

export class App extends Component {
  constructor() {
    super();
    this.boundingBox = {
      sw: {
        lng: -50.38297162496275,
        lat: 48.31125180222088
      },
      ne: {
        lng: 81.98030962503356,
        lat: 72.05983593722306
      }
    };
    this.state = {
      timeRange: ["22/05/2017", "23/05/2017"],
      crimes: [],
      crimesByType: [],
      crimesByCity: [],
      crimesByRegion: [],
      hourlyDistribution: _.range(0, 24).map(v => 0),
      hourRange: {
        min: 1,
        max: 6,
      }
    };
  }
  onTimeRangeChange = timeRange => {
    this.setState({
      timeRange
    });
    this.fetchCrimesWithDelay();
  };
  onHourRangeChange = hourRange => {
    this.setState({ hourRange }, this.fetchCrimesWithDelay);
  }
  fetchCrimesWithDelay = _.debounce(() => {
    fetchCrimes({
      startDate: this.state.timeRange[0],
      endDate: this.state.timeRange[1],
      boundingBox: this.boundingBox,
      startHour: this.state.hourRange.min,
      endHour: this.state.hourRange.max,
    })
      .then(crimes => {
        this.setState({ crimes });
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
            value: entry.count
          }))
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
            value: entry.count
          }))
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
            value: entry.count
          }))
        });
      })
      .catch(error => {
        console.error(error);
      });
      fetchAggregatedHours({
        startDate: this.state.timeRange[0],
        endDate: this.state.timeRange[1],
        boundingBox: this.boundingBox
      })
        .then(data => {
          this.setState({
            hourlyDistribution: data
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
  }

  render() {
    return (
      <div className="container">
        <Header />
        <CrimeMap
          onBoundingBoxChange={this.onBoundingBoxChange}
          crimes={this.state.crimes}
          onRender={this.onBoundingBoxChange}
        />
        <Statistics
          crimesByType={this.state.crimesByType}
          crimesByCity={this.state.crimesByCity}
          crimesByRegion={this.state.crimesByRegion}
          timeRange={this.state.timeRange}
          hourlyDistribution={this.state.hourlyDistribution}
          timeRangeSpan={["01/11/2016", "01/02/2018"]}
          onTimeRangeChange={this.onTimeRangeChange}
          hourRange={this.state.hourRange}
          onHourRangeChange={this.onHourRangeChange}
        />
      </div>
    );
  }
}

export default App;
