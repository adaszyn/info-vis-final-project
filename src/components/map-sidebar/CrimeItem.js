import React from 'react';
import moment from 'moment';

import { getCrimeTypeColor } from "../../util/crimes";

const CrimeItem = (props) => {



  const renderDescription = (description) => {
    const lengthLimit = 80;
    const descriptionSnippet = props.description.substring(0, lengthLimit);
    if(description.length > 80) {
      return `${descriptionSnippet}...`;
    }
    else {
      return `${descriptionSnippet}`;
    }
  }

  return (
    <div className="map-sidebar-results-crime-item" onClick={props.onClick}>
      <div className="map-sidebar-results-crime-content">
        <div className="map-sidebar-results-crime-title-row">
          <div 
            className="map-sidebar-results-crime-title"
            style={{ color: getCrimeTypeColor(props.crimeType)}}  
          >
            {props.crimeType}
          </div>
          <div className="map-sidebar-results-crime-date">
            {moment(props.created_at * 1000).format(
              "MMMM DD, YYYY",
            )}
          </div>
        </div>
        <div className="map-sidebar-results-crime-description">
          {renderDescription(props.description)}
        </div>
      </div>
      <div className="map-sidebar-results-crime-arrow">
        <button
          className="map-sidebar-back-button map-sidebar-crime-item-select-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="17"
            viewBox="0 0 10 17"
          >
            <path
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeWidth="2"
              d="M9 1L2 8.543 8.92 16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CrimeItem;