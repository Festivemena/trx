"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Navbar } from "@/components/Navbar";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaW5ub3ZhdG9yMjkiLCJhIjoiY20zZHV5OWVmMDZpbjJrcXVjYzBzMTFjYSJ9.51Yp-Wox2UTzc6aEZyG1OQ";

// Static Coordinates
const EKOSODIN_COORDS: [number, number] = [5.6173, 6.3396];
const MAIN_GATE_COORDS: [number, number] = [5.604, 6.335];

const MapPage = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const [pickupLocation, setPickupLocation] = useState<[number, number]>(
    EKOSODIN_COORDS
  );
  const [dropoffLocation, setDropoffLocation] = useState<[number, number]>(
    MAIN_GATE_COORDS
  );

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: pickupLocation,
      zoom: 14,
    });

    // Add Navigation Controls
    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Cleanup on unmount
    return () => mapRef.current?.remove();
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Update Markers
    const updateMarkers = () => {
      const map = mapRef.current!;

      // Clear existing markers
      const markers = document.querySelectorAll(".mapboxgl-marker");
      markers.forEach((marker) => marker.remove());

      // Add Pickup Marker
      new mapboxgl.Marker({ color: "#3D7069" })
        .setLngLat(pickupLocation)
        .setPopup(new mapboxgl.Popup().setText("Pickup Location: Ekosodin"))
        .addTo(map);

      // Add Dropoff Marker
      new mapboxgl.Marker({ color: "#FF5733" })
        .setLngLat(dropoffLocation)
        .setPopup(
          new mapboxgl.Popup().setText("Dropoff Location: Main Gate, Uniben")
        )
        .addTo(map);
    };

    updateMarkers();
  }, [pickupLocation, dropoffLocation]);

  return (
    <div className="flex flex-col h-screen font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Map Container */}
      <div className="relative flex-grow">
        <div ref={mapContainerRef} className="h-full w-full"></div>

        {/* Overlay for Locations */}
        <div className="absolute bottom-16 left-4 bg-white p-4 rounded-md shadow-lg z-10">
          <p className="text-sm font-semibold text-[#3D7069]">
            <strong>Pickup Location:</strong> {pickupLocation[0].toFixed(4)}, {pickupLocation[1].toFixed(4)}
          </p>
          <p className="text-sm font-semibold text-[#FF5733] mt-2">
            <strong>Dropoff Location:</strong> {dropoffLocation[0].toFixed(4)}, {dropoffLocation[1].toFixed(4)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
