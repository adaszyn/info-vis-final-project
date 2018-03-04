import React, { Component } from "react";
import "./StatisticsButton.css";
import "font-awesome/css/font-awesome.min.css";

export class StatisticsButton extends Component {
  render() {
    return (
      <button className="statistics__btn" onClick={this.props.handleClick}>
        {this.props.buttonName}
      </button>
    );
  }
}
