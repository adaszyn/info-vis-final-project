import React from "react";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { getTranslatedCrimeType, getCrimeTypeColor } from "../../util/crimes";
import { getTranslatedHeading } from "../../util/headings";

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
}

const CrimeDetails = props => {
  const content = props.language === "english" && props.selectedCrime.contentEng?
                props.selectedCrime.contentEng: props.selectedCrime.content;
  const contentParagraphs = cleanParagraphText(content);

  return (
    <div className="map-sidebar-scroll">
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
        {getTranslatedHeading("back", props.language)}
      </button>

      <div className="map-sidebar-content-container">
        <div
          className="map-sidebar-title"
          style={{ color: getCrimeTypeColor(props.selectedCrime.crimeType) }}
        >
          {getTranslatedCrimeType(props.selectedCrime.crimeType, props.language)}
        </div>

        <div className="map-sidebar-description">
          {props.language === "english" && props.selectedCrime.descriptionEng?
          props.selectedCrime.descriptionEng: props.selectedCrime.description }
        </div>

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
