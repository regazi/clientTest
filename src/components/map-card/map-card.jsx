import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
let token = process.env.REACT_APP_API_KEY;
const MapComponent = ({ movie }) => {
  // initialize array of markers
  const initialMarkers = [
    {
      name: "",
      location: ["", ""],
    },
  ];
  let testMarkers = [];
  let dummy = [];

  const [activeInfoWindow, setActiveInfoWindow] = useState("");
  const [markers, setMarkers] = useState(initialMarkers);
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const markerClicked = (marker, index) => {
    setActiveInfoWindow(index);
  };

  //will re-render the map with the selectedMovie prop

  useEffect(() => {
    let itemsProcessed = 0;
    //iterate through filming locations and pushes latLng to testMarkers
    movie.filmingLocations.forEach(function (locations) {
      locations.locations.forEach(function (location) {
        //    console.log("locations.locations loop")
        testMarkers.push({ location: location.location, name: location.name });
      });
      itemsProcessed++;
    });

    if (itemsProcessed === movie.filmingLocations.length) {
      setMarkers(testMarkers);
    }

    //I tried using both testMarkers and initialMarkers here. Both generated infinite render loops.
  }, dummy);

  return (
    <LoadScript googleMapsApiKey={token}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: parseFloat(markers[0].location[0]),
          lng: parseFloat(markers[0].location[1]),
        }}
        zoom={6.5}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{
              lat: parseFloat(marker.location[0]),
              lng: parseFloat(marker.location[1]),
            }}
            draggable={false}
            onClick={(event) => markerClicked(marker, index)}
          >
            {activeInfoWindow === index && (
              <InfoWindow position={marker.position}>
                <b>{marker.name}</b>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};
export default MapComponent;

MapComponent.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    setting: PropTypes.shape({
      location: PropTypes.string.isRequired,
    }).isRequired,
    filmingLocations: PropTypes.array.isRequired,
  }).isRequired,
};
