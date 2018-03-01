import React from 'react';

import { Header } from "../header/Header";
import CrimeItem from './CrimeItem'

const CrimeList = (props) => {

  const filterCrimes = (crimes, zoomLevel) => {
    
    const byRecentsFirst = (a, b) => {
      if(a.created_at < b.created_at) {
        return 1;
      }
      else {
        return -1;
      }
    }

    if((zoomLevel >= 1 && zoomLevel <= 8) || zoomLevel === null) {
      return (
        crimes
          .filter(crime => crime.crimeType.includes('Sammanfattning'))
          .sort(byRecentsFirst)
          .slice(0, 10)
      )
    }
    else {
      return (
        crimes
          .sort(byRecentsFirst)
          .slice(0, 10)
      )
    }
  }

  const filteredCrimes = filterCrimes(props.crimes, props.zoomLevel)

  return (
    <div className="map-sidebar-scroll">
      <div className="map-sidebar__background" />

      <div className="map-sidebar-results-title">
        Top 10 Results
      </div>
      <div className="map-sidebar-results-content">
        <div className="map-sidebar-crime-list">
          {filteredCrimes.map((crime, index) => (
            <CrimeItem 
              onClick={() => props.onCrimeSelected(crime)}
              key={`crime-${index}`}
              {...crime}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrimeList;