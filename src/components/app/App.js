import React, { Component } from "react";
import _ from 'underscore';
import { CrimeMap } from "../crime-map/CrimeMap";
import { Header } from "../header/Header";
import { Statistics } from "../statistics/Statistics";
import { fetchCrimes } from "../../util/api";
import { getNumericalRangeFromDates } from "../../util/range-util";
import "./App.css";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      timeRange: ['22/05/2017', '23/05/2017'],
      crimes: []
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
            this.setState({crimes})
        })
        .catch(error => {
          console.error(error);
        });
  }, 1500)

  render() {
    return (
      <div className="container">
        <Header />
        <CrimeMap />
        <Statistics
          timeRange={this.state.timeRange}
          timeRangeSpan={['01/11/2016', '01/02/2018']}
          onTimeRangeChange={this.onTimeRangeChange}
        />
      </div>
    );
  }
}

export default App;
