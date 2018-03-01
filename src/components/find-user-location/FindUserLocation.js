import React, { Component } from "react";
import "./FindUserLocation.css";
import "font-awesome/css/font-awesome.min.css";

export class FindUserLocation extends Component {
  render() {
    return (
      <button className="location__btn" onClick={this.props.handleClick}>
         {this.props.button_name}
      </button>
    );
  }
}
