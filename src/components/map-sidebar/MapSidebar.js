import React from "react";
import PropTypes from "prop-types";

import "./MapSidebar.css";

import CrimeList from './CrimeList';
import CrimeDetails from './CrimeDetails'

export const MapSidebar = props => {

  if (props.crimes.length <= 0) {
    return (
      <div className="map-sidebar map-sidebar--hiden">
        <div className="map-sidebar__background" />
      </div>
    );
  }

  if(props.selectedCrime !== undefined) {
    return (
      <CrimeDetails {...props} />
    )
  }
  else {
    return (
      <CrimeList {...props} />
    )
  }
}

MapSidebar.propTypes = {
  onBackButtonClick: PropTypes.func,
  onCrimeSelected: PropTypes.func,
  crimes: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      description: PropTypes.string,
      content: PropTypes.string,
      region: PropTypes.string,
      city: PropTypes.string,
      date: PropTypes.string,
      created_at: PropTypes.number,
    })
  ),
  selectedCrime: PropTypes.shape({
    type: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.string,
    region: PropTypes.string,
    city: PropTypes.string,
    date: PropTypes.string,
    created_at: PropTypes.number,
  }),
};
