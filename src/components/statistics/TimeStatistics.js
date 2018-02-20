import React, { Component } from "react";
import _ from "underscore";
import moment from "moment";
import { RangePicker } from "../range-picker/RangePicker";
import {
  getMonthsDifference,
  getNumericalRangeFromDates,
  DATE_FORMAT,
  DATE_STEP
} from "../../util/range-util";
export class TimeStatistics extends Component {
  onRangeChange = values => {
    const dates = [
      this.formatNumericalValueToDateString(values.min),
      this.formatNumericalValueToDateString(values.max)
    ];
    this.props.onChange(dates);
  };

  mapNumericalValueToDate = value => {
    return this.getNumericalSpan().indexOf(value);
  };

  getNumericalSpan = () =>
    getNumericalRangeFromDates(...this.props.timeRangeSpan);

  getMaxRangeSpan = () => _.max(this.getNumericalSpan());

  getMinRangeSpan = () => _.min(this.getNumericalSpan());

  getSelectedTimeSpan = () => {
    return {
      min: getMonthsDifference(
        this.props.timeRange[0],
        this.props.timeRangeSpan[0]
      ),
      max: getMonthsDifference(
        this.props.timeRange[1],
        this.props.timeRangeSpan[0]
      )
    };
  };
  formatRangeValue = (value, type) => {
    return this.formatNumericalValueToDateString(value);
  };
  formatNumericalValueToDateString = number => {
    return moment(this.props.timeRangeSpan[0], DATE_FORMAT)
      .add(number, DATE_STEP)
      .format(DATE_FORMAT);
  };

  render() {
    return (
      <div className="statistics-box time-statistics">
        <h2 className="statistics-box__header">PERIOD</h2>
        <RangePicker
          minValue={this.getMinRangeSpan()}
          maxValue={this.getMaxRangeSpan()}
          step={1}
          formatLabel={this.formatRangeValue}
          value={this.getSelectedTimeSpan()}
          onChange={this.onRangeChange}
        />
      </div>
    );
  }
}
