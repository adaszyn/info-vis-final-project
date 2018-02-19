import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "./CrimeMap.css";
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoidmlqZW1pdHUiLCJhIjoiY2pkdTlyMWQxMmltcjJwamczb2VlMnEzMiJ9.r2I_Atbg-1R3LeRBBojPfw"
});

export class CrimeMap extends Component {
  render() {
    return (
      <div className="map-container">
        <Map
          style="mapbox://styles/mapbox/dark-v9"
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
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
          </Layer>
        </Map>
      </div>
    );
  }
}
