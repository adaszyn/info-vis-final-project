import React from 'react';
import moment from "moment";
import ReactHtmlParser from "react-html-parser";

import { getCrimeTypeColor } from "../../util/crimes";

import { Header } from "../header/Header";


function cleanParagraphText(text) {
  return text
    .split(/\n|\r|\\n/)
    .map(p => p.trim().replace("<br />", ""))
    .reduce((acc, curr) => {
      if (curr !== "") {
        acc.push(curr);
      }
      return acc;
    }, []);
};

const CrimeDetails = (props) => {
  const contentParagraphs = cleanParagraphText(props.selectedCrime.content);

  return (
    <div className="map-sidebar">
      <Header
        theme={props.theme}
        language={props.language}
        onLanguageChange={props.onLanguageChange}
        onThemeChange={props.onThemeChange}
      />
      <div className="map-sidebar__background" />
      <button
        className="map-sidebar-back-button"
        onClick={props.onBackButtonClick}
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
        Back to filter result
      </button>

      <div className="map-sidebar-content-container">
        <div 
          className="map-sidebar-title" 
          style={{ color: getCrimeTypeColor(props.selectedCrime.crimeType)}}
        >
          {props.selectedCrime.crimeType}
        </div>

        <div className="map-sidebar-description">{props.selectedCrime.description}</div>

        <div className="map-sidebar-location-date-container">
          <div className="map-sidebar-location">
            {`${props.selectedCrime.city}, ${props.selectedCrime.region}`}
          </div>
          <div className="map-sidebar-date">
            {moment(props.selectedCrime.created_at * 1000).format(
              "dddd, MMMM Do YYYY, hh:mm",
            )}
          </div>
        </div>

        <div className="map-sidebar-paragraphs">
          {contentParagraphs.map((paragraph, index) => {
            // Last paragraph === Police station's name
            const key = `${props.selectedCrime.id}-${index}`;
            if (index === contentParagraphs.length - 1) {
              return (
                <p
                  key={key}
                  className="policeSignature"
                >{`- ${paragraph} -`}</p>
              );
            }
            return <p key={key}>{ReactHtmlParser(paragraph)}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default CrimeDetails;