import React, { Component } from "react";
import _ from "underscore";
import { CrimeMap } from "../crime-map/CrimeMap";
import { Header } from "../header/Header";
import { Statistics } from "../statistics/Statistics";
import { fetchCrimes, fetchAggregatedCrimeTypes, fetchAggregatedCities } from "../../util/api";
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
    };
  }
  onTimeRangeChange = timeRange => {
    this.setState({
      timeRange
    });
    this.fetchCrimesWithDelay();
  };

  fetchCrimesWithDelay = _.debounce(() => {
    fetchCrimes({
      startDate: this.state.timeRange[0],
      endDate: this.state.timeRange[1]
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
    })
      .then(data => {
          this.setState({
              crimesByType: data.map(entry => ({label: entry.title, value: entry.count}))
          })
      })
      .catch(error => {
        console.error(error);
      });
      fetchAggregatedCities({
        startDate: this.state.timeRange[0],
        endDate: this.state.timeRange[1],
        boundingBox: this.boundingBox,
      })
        .then(data => {
            this.setState({
                crimesByCity: data.map(entry => ({label: entry.title, value: entry.count}))
            })
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
          timeRange={this.state.timeRange}
          timeRangeSpan={["01/11/2016", "01/02/2018"]}
          onTimeRangeChange={this.onTimeRangeChange}
        />
      </div>
    );
  }
}

export default App;
