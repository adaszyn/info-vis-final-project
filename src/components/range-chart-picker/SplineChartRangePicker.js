import React, { Component } from 'react';
import {
  select,
  curveCardinal,
  scaleLinear,
  line,
  curveBundle,
  curveCardinalClosed,
} from 'd3';
import moment from 'moment';
import { range, min, max } from 'underscore';
import InputRange from 'react-input-range';
import {
  getMonthsDifference,
  getNumericalRangeFromDates,
  DATE_FORMAT,
  DATE_STEP,
} from '../../util/range-util';
import './ChartRangePicker.css';

const MAX_NUMBER_OF_LABELS = 6;

const keepEveryNElement = (collection, n) => {
  const len = collection.length;
  const step = len / n;
  const result = [];
  if (n >= len) {
    return collection;
  }
  for (let i = 0; i < len; i += step) {
    result.push(collection[Math.floor(i)]);
  }
  return result;
};

export class SplineChartRangePicker extends Component {
  constructor(props) {
    super(props);
    this.xScale = scaleLinear();
    this.yScale = scaleLinear();
    this.adjustScale(props);
    this.svgElement = this.svgElement;
  }
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

  getMaxRangeSpan = () => max(this.getNumericalSpan());

  getMinRangeSpan = () => min(this.getNumericalSpan());

  getRangeSpan = () =>
    Math.abs(this.getMaxRangeSpan() - this.getMinRangeSpan());

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

  adjustScale = props => {
    const { values, labels } = props.monthlyDistribution;
    const domain = range(labels.length);
    this.xScale = this.xScale.range([5, 95]).domain([min(domain), max(domain)]);
    this.yScale = this.yScale.range([5, 95]).domain([min(values), max(values)]);
  };

  renderBar = (value, index) => {
    const { values, labels } = this.props.monthlyDistribution;
    const style = {
      height: this.percentageScale(value) + '%',
      minWidth: 100 / values.length + '%',
    };
    const fillStyle = {
      opacity:
        index >= this.props.hourRange.min && index < this.props.hourRange.max
          ? 1.0
          : 0.4,
    };
    return (
      <div
        key={`graph-bar-${index}`}
        className="bar-chart-range__bar"
        style={style}
      >
        <div style={fillStyle} className="bar-chart-range__bar-fill" />
      </div>
    );
  };

  componentWillReceiveProps(newProps) {
    this.adjustScale(newProps);
  }
  formatRangeValue = (value, type) => {
    return undefined;
  };
  render() {
    const { values, labels } = this.props.monthlyDistribution;
    const domain = range(labels.length);
    const data = domain.reduce(
      (zipped, x, i) => [
        ...zipped,
        { x: this.xScale(x), y: 100 - this.yScale(values[i]) },
      ],
      [{ x: 0, y: 100 }],
    );
    data.push({ x: 100, y: 100 });

    var lineFunction = line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(curveCardinalClosed);
    //   .curve(curveBundle());
    if (this.svgElement) {
      select(this.svgElement).html(null);
      select(this.svgElement)
        .append('path')
        .attr('d', lineFunction(data))
        .attr('stroke', '#9fa6b7')
        .attr('stroke-width', 1)
        .attr('fill', '#9fa6b7');
    }
    const domainLength = this.getRangeSpan();
    const minValue = this.getSelectedTimeSpan().min;
    const maxValue = this.getSelectedTimeSpan().max;
    const filteredLabels = keepEveryNElement(
      this.props.monthlyDistribution.labels,
      MAX_NUMBER_OF_LABELS,
    );
    const leftOverlayStyle = {
      width: `${100 * minValue / domainLength}%`,
      left: 0,
      top: 0,
    };
    const rightOverlayStyle = {
      width: `${100 * (domainLength - maxValue) / domainLength}%`,
      left: `${100 * maxValue / domainLength}%`,
      top: 0,
    };
    return (
      <div className="chart-range-picker-container bar-chart-range">
        <div
          style={leftOverlayStyle}
          className="chart-range-picker-overlay chart-range-picker-overlay__left"
        />
        <div
          style={rightOverlayStyle}
          className="chart-range-picker-overlay chart-range-picker-overlay__left"
        />
        <svg
          className="bars-container"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          width="100%"
          ref={svgElement => (this.svgElement = svgElement)}
        />
        <InputRange
          minValue={this.getMinRangeSpan()}
          maxValue={this.getMaxRangeSpan()}
          step={1}
          formatLabel={this.formatRangeValue}
          value={this.getSelectedTimeSpan()}
          onChange={this.onRangeChange}
        />
        <div className="chart-range-picker-container-labels">
          {filteredLabels.map(label => <span key={label}>{label}</span>)}
        </div>
      </div>
    );
  }
}
