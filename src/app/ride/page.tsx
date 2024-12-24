"use client";
import React, { useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { distanceTo } from "geolib"; // Install geolib for distance calculation
import { Map, Marker } from "react-map-gl";

mapboxgl.accessToken = "pk.eyJ1IjoiaW5ub3ZhdG9yMjkiLCJhIjoiY20zZHV5OWVmMDZpbjJrcXVjYzBzMTFjYSJ9.51Yp-Wox2UTzc6aEZyG1OQ";

export const RidePage = () => {
  const [pointA, setPointA] = useState(null);
  const [pointB, setPointB] = useState(null);
  const [distance, setDistance] = useState(null);

  const handleClick = (e) => {
    const coords = { latitude: e.lngLat.lat, longitude: e.lngLat.lng };

    if (!pointA) {
      setPointA(coords);
    } else if (!pointB) {
      setPointB(coords);
      const dist = distanceTo(coords, pointA) / 1000; // Convert meters to kilometers
      setDistance(dist.toFixed(2));
    } else {
      setPointA(coords);
      setPointB(null);
      setDistance(null);
    }
  };

  return (
    <div className="bg-white text-black py-8 min-h-screen">
      <div className="container">
        <h2 className="font-bold text-4xl text-center mb-4">Plan Your Ride</h2>
        <p className="text-center text-lg text-black/70">
          Select your starting point (Point A) and destination (Point B) to
          calculate the approximate distance.
        </p>
        <div className="mt-8 relative h-[500px] rounded-lg overflow-hidden">
          <Map
            initialViewState={{
              longitude: -73.935242,
              latitude: 40.73061,
              zoom: 10,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onClick={handleClick}
          >
            {pointA && (
              <Marker
                longitude={pointA.longitude}
                latitude={pointA.latitude}
                color="blue"
              />
            )}
            {pointB && (
              <Marker
                longitude={pointB.longitude}
                latitude={pointB.latitude}
                color="red"
              />
            )}
          </Map>
        </div>
        {distance && (
          <div className="mt-6 text-center">
            <h3 className="font-medium text-2xl">Approximate Distance:</h3>
            <p className="text-xl text-black/80 mt-2">{distance} km</p>
          </div>
        )}
        <div className="mt-6 text-center">
          <button
            className="bg-black text-white py-2 px-5 rounded-lg"
            onClick={() => {
              setPointA(null);
              setPointB(null);
              setDistance(null);
            }}
          >
            Reset Points
          </button>
        </div>
      </div>
    </div>
  );
};
