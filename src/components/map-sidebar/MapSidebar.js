import React from "react";
import PropTypes from "prop-types";

import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';

import './MapSidebar.css';

export const MapSidebar = (props) => {

  // Clean the content (long description) of newline characters, and line breaks
  const contentParagraphs = props.crime.content
                            .split(/\n|\r|\\n/)
                            .map(p => p.trim().replace('<br />', ''))
                            .reduce((acc, curr) => {
                              if(curr !== '') {
                                acc.push(curr)
                              }
                              return acc
                            }, [])

  return (
    <div className="map-sidebar">
      <button 
        className="map-sidebar-back-button"
        onClick={props.onBackButtonClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17"
        >
          <path fill="none" fillRule="evenodd" strokeLinecap="round" strokeWidth="2" d="M9 1L2 8.543 8.92 16"/>
        </svg>
        Back to filter result
      </button>

      <div className="map-sidebar-content-container">
        <div 
          className={`map-sidebar-title ${props.crimeClassName}`}
        >
          {props.crime.crimeType}
        </div>

        <div className="map-sidebar-description">{props.crime.description}</div>
        
        <div className="map-sidebar-location-date-container">
          <div className="map-sidebar-location">{`${props.crime.city}, ${props.crime.region}`}</div>
          <div className="map-sidebar-date">
            {moment(props.crime.created_at * 1000).format("dddd, MMMM Do YYYY, hh:mm")}
          </div>
        </div>

        <div className="map-sidebar-paragraphs">
          {contentParagraphs.map((paragraph, index) => {
            // Last paragraph === Police station's name
            const key = `${props.crime.id}-${index}`
            if(index === contentParagraphs.length - 1) {
              return <p key={key} className="policeSignature">{`- ${paragraph} -`}</p>;
            }
            return <p key={key}>{ReactHtmlParser(paragraph)}</p>;
          })}
        </div>
      </div>
      <div className="map-sidebar-buttons-container">
        <button 
          className="map-sidebar-button map-sidebar-viewSource-button"
          onClick={props.onViewSourceButtonClick}
        >
          View Source
        </button>
        <button 
          className="map-sidebar-button map-sidebar-mark-button"
          onClick={props.onMarkButtonClick}
        >
          Mark
        </button>
      </div>
    </div>
  )
}

MapSidebar.propTypes = {
  crimeClassName: PropTypes.string,
  crime: PropTypes.shape({
    type: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.string,
    region: PropTypes.string,
    city: PropTypes.string,
    date: PropTypes.string,
    created_at: PropTypes.number,
  }),
  onBackButtonClick: PropTypes.func,
  onViewSourceButtonClick: PropTypes.func,
  onMarkButtonClick: PropTypes.func
};
