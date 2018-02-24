import React, { Component } from 'react';
import "./FindUserLocation.css";
import 'font-awesome/css/font-awesome.min.css';

export class FindUserLocation extends Component {
  render() {
  	 
    return (
      	 <button
        className="btn location__btn"
        onClick={this.props.handleClick}>Use my location <i className="fa fa-crosshairs medium-size__icon"></i> </button>
    )
  }
}

