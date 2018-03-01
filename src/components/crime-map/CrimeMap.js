import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { groupBy, first, map, flatten } from "underscore";
import { getCrimeTypeColor } from "../../util/crimes";

import "./CrimeMap.css";
import { MapSidebar } from "../map-sidebar/MapSidebar";
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoidmlqZW1pdHUiLCJhIjoiY2pkdTlyMWQxMmltcjJwamczb2VlMnEzMiJ9.r2I_Atbg-1R3LeRBBojPfw",
});

const INITIAL_CENTER = [15.798669, 62.450588];
const INITIAL_ZOOM = [3];

const heatMapLayerConfig = {
  "heatmap-weight": ["interpolate", ["linear"], ["get", "mag"], 0, 0, 6, 1],
  "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
  "heatmap-color": [
    "interpolate",
    ["linear"],
    ["heatmap-density"],
    0,
    "rgba(33,102,172,0)",
    0.2,
    "rgb(103,169,207)",
    0.4,
    "rgb(209,229,240)",
    0.6,
    "rgb(253,219,199)",
    0.8,
    "rgb(239,138,98)",
    1,
    "rgb(178,24,43)",
  ],
  "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 9, 20],
  "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
};

function getLayerPointPaintConfig(crimeType) {
  return {
    "circle-color": getCrimeTypeColor(crimeType),
    "circle-stroke-color": "white",
    "circle-stroke-width": 1,
    "circle-opacity": ["interpolate", ["linear"], ["zoom"], 7, 0, 8, 1],
  };
}

export class CrimeMap extends Component {
  constructor() {
    super();
    this.zoom = null;
  }
  onZoom = map => {
    const boundingBoxEvent = map.getBounds();

    this.props.onBoundingBoxChange({
      sw: boundingBoxEvent._sw,
      ne: boundingBoxEvent._ne,
    });
    this.zoom = map.getZoom();
  };

  renderCrimeMarker = crime => {
    return (
      <Feature
        key={crime.id}
        id={crime.id}
        onClick={() => this.props.onCrimeSelected(crime)}
        coordinates={[crime.lng, crime.lat]}
      />
    );
  };

  renderLayers = crimesByType => {
    return map(crimesByType, (crimes, crimeType) => {
      return (
        <Layer
          key={`crime-type-point-layer-${crimeType}`}
          type="circle"
          minZoom={8}
          id={`crime-layer-point-${crimeType}`}
          paint={getLayerPointPaintConfig(crimeType)}
        >
          {crimes.map(this.renderCrimeMarker)}
        </Layer>
      );
    });
  };

  render() {
    const crimesByType = groupBy(this.props.crimes, "crimeType");
    return (
      <div className="map-container">
        <Map
          style="mapbox://styles/mapbox/dark-v9"
          center={this.props.center}
          zoom={this.props.zoom}
          onZoom={this.onZoom}
          onMove={this.onZoom}
          containerStyle={{
            height: "100%",
            width: "100%",
          }}
        >
          {this.renderLayers(crimesByType)}

          <Layer type="heatmap" id="marker" paint={heatMapLayerConfig}>
            {this.props.crimes.map(this.renderCrimeMarker)}
          </Layer>
        </Map>
        <MapSidebar
          selectedCrime={this.props.selectedCrime}
          crimes={this.props.crimes}
          onCrimeSelected={this.props.onCrimeSelected}
          onBackButtonClick={this.props.onCrimeDeselect}
          theme={this.props.theme}
          language={this.props.language}
          onLanguageChange={this.props.onLanguageChange}
          onThemeChange={this.props.onThemeChange}
          zoomLevel={this.zoom}
        />
      </div>
    );
  }
}
CrimeMap.defaultProps = {
  crimes: [],
};
