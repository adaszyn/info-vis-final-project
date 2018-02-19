import React, { Component } from 'react';
import { SearchBar } from '../search-bar/SearchBar';
import './Header.css';

export class Header extends Component {
  render() {
    return (
      <div className="header">
        CRIMEVIS
        <SearchBar />
      </div>
    );
  }
}

