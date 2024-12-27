"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Navbar } from "@/components/Navbar";

mapboxgl.accessToken = "pk.eyJ1IjoiaW5ub3ZhdG9yMjkiLCJhIjoiY20zZHV5OWVmMDZpbjJrcXVjYzBzMTFjYSJ9.51Yp-Wox2UTzc6aEZyG1OQ";

const MapPage = () => {
  const mapContainerRef = useRef(null);
  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/streets-v12");

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [0, 0], // Initial center [lng, lat]
      zoom: 12, // Initial zoom
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Cleanup on unmount
    return () => map.remove();
  }, [mapStyle]);

  return (
    <div className="flex flex-col h-screen font-sans">
      {/* Header */}
      <Navbar />
      <header className="bg-gradient-to-b from-[#FFFFFF] to-[#D9F1F0] text-[#071919] py-6 px-4 text-center shadow-md">
        <h1 className="text-2xl font-extrabold mb-2">Tranxity is more</h1>
        <p className="text-sm leading-6">
          Tranxity is a user-friendly bike-hailing app designed to make urban commuting affordable, sustainable, and convenient.
        </p>
      </header>

      {/* Map Container */}
      <div className="relative flex-grow">
        {/* Style Selector */}
        <div className="absolute top-4 left-4 z-10 bg-white shadow-lg rounded-lg p-3">
          <h2 className="font-medium text-sm mb-2">Select Map Style</h2>
          <select
            value={mapStyle}
            onChange={(e) => setMapStyle(e.target.value)}
            className="w-full p-2 border rounded bg-[#f8f8f8] focus:outline-none"
          >
            <option value="mapbox://styles/mapbox/streets-v12">Streets</option>
            <option value="mapbox://styles/mapbox/outdoors-v12">Outdoors</option>
            <option value="mapbox://styles/mapbox/light-v12">Light</option>
            <option value="mapbox://styles/mapbox/dark-v12">Dark</option>
            <option value="mapbox://styles/mapbox/satellite-v12">Satellite</option>
          </select>
        </div>
        <div ref={mapContainerRef} className="h-full w-full"></div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-[#FFFFFF] to-[#D9F1F0] text-[#071919] py-6 px-4 text-center shadow-md">
        <div className="mb-4">
          <p className="text-xl font-semibold">Get Instant Access</p>
          <p className="text-sm leading-5 mb-4">
            Sign up now to explore, navigate, and ride with ease.
          </p>
          <form className="flex flex-col items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full max-w-sm mb-3 p-3 border rounded-lg text-sm"
            />
            <button className="w-full max-w-sm bg-[#3D7069] text-white font-medium py-2 rounded-lg hover:bg-[#29574F] transition">
              Get access
            </button>
          </form>
        </div>
        <p className="text-xs mt-4">
          © 2025 Tranxity. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default MapPage;
