import React, { Component } from 'react';
import { CrimeMap } from '../crime-map/CrimeMap';
import { Header } from '../header/Header';
import { Statistics } from '../statistics/Statistics';
import './App.css';

export class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <CrimeMap />
        <Statistics />
      </div>
    );
  }
}

export default App;
