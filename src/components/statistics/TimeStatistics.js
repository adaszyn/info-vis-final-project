import React, { Component } from "react";
import _ from "underscore";
import moment from "moment";
import DatePicker from "react-datepicker";
import { RangePicker } from "../range-picker/RangePicker";
import {
  getMonthsDifference,
  getNumericalRangeFromDates,
  DATE_FORMAT,
  DATE_STEP,
} from "../../util/range-util";
import { BarChartRangePicker } from "../range-chart-picker/BarChartRangePicker";
import { SplineChartRangePicker } from "../range-chart-picker/SplineChartRangePicker";
import "react-datepicker/dist/react-datepicker.css";
import "./TimeStatistics.css";
import nextIcon from "../../assets/next.svg";

export class TimeStatistics extends Component {
  onRangeChange = values => {
    const dates = [
      this.formatNumericalValueToDateString(values.min),
      this.formatNumericalValueToDateString(values.max),
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
        this.props.timeRangeSpan[0],
      ),
      max: getMonthsDifference(
        this.props.timeRange[1],
        this.props.timeRangeSpan[0],
      ),
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
  handleStartDateChange = date => {
    this.props.onChange([
      moment(date, DATE_FORMAT),
      moment(this.props.timeRange[1], DATE_FORMAT),
    ]);
  };
  handleEndDateChange = date => {
    this.props.onChange([
      moment(this.props.timeRange[0], DATE_FORMAT),
      moment(date, DATE_FORMAT),
    ]);
  };
  render() {
    const startDate = moment(this.props.timeRange[0], DATE_FORMAT);
    const endDate = moment(this.props.timeRange[1], DATE_FORMAT);
    const minDate = moment(this.props.timeRangeSpan[0], DATE_FORMAT);
    const maxDate = moment(this.props.timeRangeSpan[1], DATE_FORMAT);
    return (
      <div className="statistics-box time-statistics">
        <h2 className="statistics-box__header-period">PERIOD</h2>
        <div className="date-pickers-container">
          <DatePicker
            selected={startDate}
            className="date-picker"
            calendarClassName="date-picker__calendar"
            popperClassName="date-picker__popper"
            maxDate={endDate}
            minDate={minDate}
            popperPlacement="left-start"
            onChange={this.handleStartDateChange}
          />
          <img
            alt="next-icon"
            className="date-picker__next-icon"
            src={nextIcon}
          />
          <DatePicker
            selected={endDate}
            className="date-picker"
            calendarClassName="date-picker__calendar"
            popperClassName="date-picker__popper"
            onChange={this.handleEndDateChange}
            minDate={startDate}
            popperPlacement="left-start"
            maxDate={maxDate}
          />
        </div>

        <div className="chart-range-picker-container-labels-time-selection">
          Select the time range during a day
        </div>

        <BarChartRangePicker
          domain={_.range(0, 24)}
          hourRange={this.props.hourRange}
          onHourRangeChange={this.props.onHourRangeChange}
          values={this.props.hourlyDistribution}
        />

        <div className="chart-range-picker-container-labels-time-selection">
          Select the date range
        </div>

        <SplineChartRangePicker
          monthlyDistribution={this.props.monthlyDistribution}
          hourRange={this.props.hourRange}
          onHourRangeChange={this.props.onHourRangeChange}
          timeRange={this.props.timeRange}
          timeRangeSpan={this.props.timeRangeSpan}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
