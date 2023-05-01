import React from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
  ZoomableGroup
} from "react-simple-maps";

import allStates from "/public/allstates.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const Map = () => {
  const bostonCoords = [-71.0589, 42.3601]; // Coordinates for Boston
  const INCoords = [-80, 40];

  return (
    <ComposableMap
      projection="geoAlbersUsa"
      projectionConfig={{
        scale: 1500
      }}
      style={{ width: "100%", height: "100%", transform: "translateY(-50px)" }}
    >
      <ZoomableGroup center={INCoords}>
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <>
              {geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  stroke="#FFF"
                  geography={geo}
                  fill="#2C065D"
                />
              ))}

              {/* Add a pointer for Boston */}
              <Marker coordinates={bostonCoords}>
                <circle cx={0} cy={0} r={6} fill="#F00" />
              </Marker>

              {/* Add the "We are here" annotation */}
              <Annotation
                subject={bostonCoords}
                dx={30}
                dy={-10}
                connectorProps={{
                  stroke: "#FFF", // Make the arrow white
                  strokeWidth: 2,
                  strokeLinecap: "round",
                }}
              >
                <text x={4} fontSize={14} alignmentBaseline="middle" fill="#FFF">
                  We are here
                </text>
              </Annotation>
            </>
          )}
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default Map;
