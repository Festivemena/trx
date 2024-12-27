"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "pk.eyJ1IjoiaW5ub3ZhdG9yMjkiLCJhIjoiY20zZHV5OWVmMDZpbjJrcXVjYzBzMTFjYSJ9.51Yp-Wox2UTzc6aEZyG1OQ";

const MapPage = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Coordinates for Ekosodin and Main Gate (Ugbowo)
  const ekosodinCoords = [5.6173, 6.3396]; // Ekosodin (lng, lat)
  const mainGateCoords = [5.6040, 6.3350]; // Main Gate (Ugbowo campus, lng, lat)

  const [pickupLocation, setPickupLocation] = useState(ekosodinCoords);
  const [dropoffLocation, setDropoffLocation] = useState(mainGateCoords);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: pickupLocation,
      zoom: 14,
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add Pickup Marker
    const pickupMarker = new mapboxgl.Marker({ color: "#3D7069" })
      .setLngLat(pickupLocation)
      .setPopup(new mapboxgl.Popup().setText("Pickup Location: Ekosodin"))
      .addTo(map);

    // Add Dropoff Marker
    const dropoffMarker = new mapboxgl.Marker({ color: "#FF5733" })
      .setLngLat(dropoffLocation)
      .setPopup(new mapboxgl.Popup().setText("Dropoff Location: Main Gate, Uniben"))
      .addTo(map);

    // Click event to set Pickup and Dropoff locations dynamically
    map.on("click", (e) => {
      const { lng, lat } = e.lngLat;

      // Allow updating Pickup and Dropoff locations interactively
      if (!pickupLocation) {
        setPickupLocation([lng, lat]);
        pickupMarker.setLngLat([lng, lat]);
        pickupMarker.getPopup()?.setText("Updated Pickup Location");
      } else {
        setDropoffLocation([lng, lat]);
        dropoffMarker.setLngLat([lng, lat]);
        dropoffMarker.getPopup()?.setText("Updated Dropoff Location");
      }
    });

    // Cleanup on unmount
    return () => map.remove();
  }, [pickupLocation, dropoffLocation]);

  return (
    <div className="flex flex-col h-screen font-sans">
      {/* Header */}
      <header className="bg-gradient-to-b from-[#FFFFFF] to-[#D9F1F0] text-[#071919] py-6 px-4 text-center shadow-md">
        <h1 className="text-2xl font-extrabold mb-2">Select Your Ride</h1>
        <p className="text-sm leading-6">
          Choose pickup and drop-off locations for your trip between Ekosodin and Uniben.
        </p>
      </header>

      {/* Map Container */}
      <div className="relative flex-grow">
        <div ref={mapContainerRef} className="h-full w-full"></div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-[#FFFFFF] to-[#D9F1F0] text-[#071919] py-6 px-4 text-center shadow-md">
        <p className="text-sm">
          <strong>Pickup Location:</strong> {pickupLocation.join(", ")}
        </p>
        <p className="text-sm">
          <strong>Dropoff Location:</strong> {dropoffLocation.join(", ")}
        </p>
        <p className="text-xs mt-4">© 2025 Tranxity. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MapPage;
