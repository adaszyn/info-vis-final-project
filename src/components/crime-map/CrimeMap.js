import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "./CrimeMap.css";
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoidmlqZW1pdHUiLCJhIjoiY2pkdTlyMWQxMmltcjJwamczb2VlMnEzMiJ9.r2I_Atbg-1R3LeRBBojPfw"
});

export class CrimeMap extends Component {
  renderCrimeMarker = crime => {
    return <Feature key={crime.id} coordinates={[crime.lng, crime.lat]} />;
  };
  render() {
    return (
      <div className="map-container">
        <Map
          style="mapbox://styles/mapbox/dark-v9"
          center={[15.798669, 62.450588]}
          zoom={[3]}
          containerStyle={{
            height: "100%",
            width: "100%"
          }}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}
          >
            {this.props.crimes.map(this.renderCrimeMarker)}
          </Layer>
        </Map>
      </div>
    );
  }
}
