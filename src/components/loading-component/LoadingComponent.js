import React, { Component } from "react";
import PropTypes from "prop-types";
import { omit } from "underscore";
import { Loader } from "../loader/Loader";
import "./LoadingComponent.css";

export class LoadingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resolved: false,
      value: undefined,
      error: null
    };
    this.promise = props.data;
    this.promise.then(this.resolvePromise);
    this.promise.catch(this.rejectPromise);
  }
  resolvePromise = value => {
    this.setState({
      resolved: true,
      value
    });
  };
  rejectPromise = error => {
    this.setState({
      resolved: true,
      error
    });
  };
  componentWillReceiveProps(newProps) {
    this.setState({ resolved: false });
    this.promise = newProps.data;
    this.promise.then(this.resolvePromise);
    this.promise.catch(this.rejectPromise);
  }
  render() {
    const WrappedComponent = this.props.wrappedComponent;
    const props = omit(
      {
        ...this.props,
        ...{ [this.props.dataLabel]: this.state.value }
      },
      "data",
      "dataLabel",
      "wrappedComponent",
      "containerClassName"
    );
    return (
      <div className={"loading-component " + this.props.containerClassName}>
        {!this.state.resolved && <Loader />}
        <WrappedComponent {...props} />
      </div>
    );
  }
}
LoadingComponent.propTypes = {
  data: PropTypes.any.isRequired,
  dataLabel: PropTypes.string.isRequired,
  wrappedComponent: PropTypes.any,
  containerClassName: PropTypes.string
};
