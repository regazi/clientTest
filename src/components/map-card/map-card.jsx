import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
let token = "AIzaSyABbaEQenuYHQwasoLxCBC-BzCqNkjTZCk";
//config.MY_API_TOKEN;
const MapComponent = ({ movie }) => {
  // empty marker arrays
  const initialMarkers = [
    {
      name: "",
      location: ["", ""],
    },
  ];
  let testMarkers = [];
  let dummy = [""];
  let cameraCenter = {
    lat: Number,
    lng: Number,
  };
  const defCenter = {
    lat: 28.727171785699753,
    lng: -81.87291325225193,
  };

  const [activeInfoWindow, setActiveInfoWindow] = useState("");
  const [markers, setMarkers] = useState(initialMarkers);
  let [center, setCenter] = useState(defCenter);
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const mapClicked = (event) => {
    console.log(event.latLng.lat(), event.latLng.lng());
  };

  const markerClicked = (marker, index) => {
    setActiveInfoWindow(index);
    console.log(marker, index);
  };

  const markerDragEnd = (event, index) => {
    console.log(event.latLng.lat());
    console.log(event.latLng.lng());
  };
  function log(x) {
    console.log(x);
  }
  //will re-render the map with the selectedMovie prop

  useEffect(() => {
    //set up an avg view at some point
    let latAvg = 0;
    let lngAvg = 0;
    let itemsProcessed = 0;
    movie.filmingLocations.forEach(function (locations) {
      locations.locations.forEach(function (location) {
        //    console.log("locations.locations loop")
        testMarkers.push({ location: location.location, name: location.name });
      });
      console.log(markers.length);
      //     console.log("fimlingLocations loop")
      itemsProcessed++;
    });

    if (itemsProcessed === movie.filmingLocations.length) {
      //   console.log("setMarkers")
      //   console.log(itemsProcessed)
      cameraCenter = {
        lat: parseFloat(testMarkers[0].location[0]),
        lng: parseFloat(testMarkers[0].location[1]),
      };
      console.log(cameraCenter);
      //setCenter isnt working right now

      setMarkers(testMarkers);
      setCenter(cameraCenter);
    }

    //I tried using both testMarkers and initialMarkers here. Both generated infinite render loops.
  }, dummy);

  return (
    <LoadScript googleMapsApiKey={token}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7.5}>
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
