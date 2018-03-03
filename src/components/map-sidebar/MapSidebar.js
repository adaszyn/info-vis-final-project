import React from "react";
import PropTypes from "prop-types";

import "./MapSidebar.css";

import CrimeList from "./CrimeList";
import CrimeDetails from "./CrimeDetails";
import { Header } from "../header/Header";
export const MapSidebar = props => {
  if (props.crimes.length <= 0) {
    return (
      <div className="map-sidebar map-sidebar--hiden">
        <div className="map-sidebar__background" />
      </div>
    );
  }
  const containerClassName = props.isStatisticBarHidden
    ? "map-sidebar"
    : "map-sidebar map-sidebar--short";

  return (
    <div className={containerClassName}>
      <Header
        theme={props.theme}
        language={props.language}
        onLanguageChange={props.onLanguageChange}
        onThemeChange={props.onThemeChange}
      />
      {props.selectedCrime ? (
        <CrimeDetails {...props} />
      ) : (
        <CrimeList {...props} />
      )}
    </div>
  );
};

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
    }),
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
