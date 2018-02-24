import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "./CrimeMap.css";
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoidmlqZW1pdHUiLCJhIjoiY2pkdTlyMWQxMmltcjJwamczb2VlMnEzMiJ9.r2I_Atbg-1R3LeRBBojPfw"
});

export class CrimeMap extends Component {
  onZoom = map => {
    const boundingBoxEvent = map.getBounds();
    
    this.props.onBoundingBoxChange({
      sw: boundingBoxEvent._sw,
      ne: boundingBoxEvent._ne,
    });
  };
  renderCrimeMarker = crime => {
    return <Feature key={crime.id} coordinates={[crime.lng, crime.lat]} />;
  };

  render() {
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
            width: "100%"
          }}
        >
          <Layer
            type="heatmap"
            id="marker"
          >
            {this.props.crimes.map(this.renderCrimeMarker)}
          </Layer>
        </Map>
      </div>
    );
  }
}
