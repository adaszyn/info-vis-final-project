import React, { Component } from "react";
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
      timeRange: ['01/05/2016', '01/01/2017']
    };
    fetchCrimes({
      startYear: this.state.timeRange.min,
      endYear: this.state.timeRange.max
    })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  onTimeRangeChange = timeRange => {
    this.setState({
      timeRange
    });
  };

  render() {
    return (
      <div className="container">
        <Header />
        {/* <CrimeMap /> */}
        <Statistics
          timeRange={this.state.timeRange}
          timeRangeSpan={['01/01/2016', '01/01/2018']}
          onTimeRangeChange={this.onTimeRangeChange}
        />
      </div>
    );
  }
}

export default App;
