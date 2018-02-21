import React from "react";
import PropTypes from "prop-types";

import './MapSidebar.css'

const data = {
  "id": 60841,
  "crimeType": "Bråk",
  "description": "Ett bråk har uppstått på ett av Migrationsverkets boende i Sunne.",
  "content": "Bråket föranleder att en väktare som kallats till platsen utlöser sitt överfallslarm då han inte reder upp situationen.<br />När polis anländer visar det sig att väktaren blivit nerslagen. Uppgifter framkommer att någon har förevisat en kniv.\\nEn misstänkt gärningsman grips kort därefter och beläggs med handfängsel.\\nSaker har slagits sönder inne på boendet och bilrutor till bilar parkerade utanför har krossats.\\nDen gripne mannen är misstänkt för våld och hot mot tjänsteman samt skadegörelse.<br />\\n \\nPolisen Värmland",
  "region": "Värmlands län",
  "city": "Sunne",
  "lat": 59.8365575,
  "lng": 13.1440464,
  "created_at": 1518540316
}

const titleColor = '#ce6076'

export const MapSidebar = (props) => {

  // Clean the content (long description) of newline characters, and line breaks
  const contentParagraphs = data.content
                            .split('\\n')
                            .map(p => p.trim().replace('<br />', ''))
                            .reduce((acc, curr) => {
                              if(curr !== '') {
                                acc.push(curr)
                              }
                              return acc
                            }, [])

  return (
    <div className="map-sidebar">
      <button className="map-sidebar-back-button">
        <svg
          xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17"
        >
          <path fill="none" fillRule="evenodd" strokeLinecap="round" strokeWidth="2" d="M9 1L2 8.543 8.92 16"/>
        </svg>
        Back to filter result
      </button>
      <div 
        className="map-sidebar-title"
        style={{ color: titleColor }}
      >
        {data.crimeType}
      </div>
      <div className="map-sidebar-description">{data.description}</div>
      <div className="map-sidebar-location">{`${data.city}, ${data.region}`}</div>
      <div className="map-sidebar-content">
        {contentParagraphs.map((paragraph, index) => {
          // Last paragraph === Police station's name
          let className = ''
          if(index === contentParagraphs.length - 1) {
            className = 'policeSignature'
          }
          return <p key={`${data.id}-${index}`} className={className}>{paragraph}</p>
        })}
      </div>
      <div className="map-sidebar-buttons-container">
        <button className="map-sidebar-button map-sidebar-viewSource-button">
          View Source
        </button>
        <button className="map-sidebar-button map-sidebar-mark-button">
          Mark
        </button>
      </div>
    </div>
  )
}
MapSidebar.propTypes = {
  crime: PropTypes.shape({
    type: PropTypes.string,
    description: PropTypes.string,
    city: PropTypes.string,
    region: PropTypes.string,
    date: PropTypes.string
  })
};
