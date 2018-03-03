import React, { Component } from "react";
import "./ToggleBar.css";
import moment from "moment";
import { DATE_FORMAT } from "../../util/range-util";

export class ToggleBar extends Component {
  render() {
    return (
      <div
        onClick={this.props.toggleStatisticsBar}
        className="btn statistics-toggle-bar"
      >
        <span className="toggle-bar-left-items">
          <i
            className={
              this.props.isStatisticBarHidden
                ? "fa fa-angle-double-up fa-fw"
                : "fa fa-angle-double-down fa-fw"
            }
          />FILTER
        </span>
        <span className="toggle-bar-right-items">
          {this.props.timeRange.map(function(object) {
            return moment(object, DATE_FORMAT).format(DATE_FORMAT) + " ‧ ";
          })}
          {this.props.hourRange.min} h - {this.props.hourRange.max} h
        </span>
      </div>
    );
  }
}
