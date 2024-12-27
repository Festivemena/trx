"use client"
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaW5ub3ZhdG9yMjkiLCJhIjoiY20zZHV5OWVmMDZpbjJrcXVjYzBzMTFjYSJ9.51Yp-Wox2UTzc6aEZyG1OQ';

export default function MapPage() {
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);
    const [lightPreset, setLightPreset] = useState('day');
    const [placeLabels, setPlaceLabels] = useState(true);
    const [poiLabels, setPoiLabels] = useState(true);
    const [roadLabels, setRoadLabels] = useState(true);
    const [transitLabels, setTransitLabels] = useState(true);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        const mapInstance = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12', // Use a Mapbox style URL
            center: [5.6001, 6.3337], // Updated coordinates for UNIBEN, Ugbowo
            zoom: 15.1,
            pitch: 62,
            bearing: -20,
        });

        mapInstance.on('style.load', () => {
            // Add a source and layer for the line
            mapInstance.addSource('line', {
                type: 'geojson',
                lineMetrics: true,
                data: {
                    type: 'LineString',
                    coordinates: [
                        [5.6001, 6.3337], // Start point near UNIBEN
                        [5.6041, 6.3350], // End point (you can adjust as needed)
                    ],
                },
            });

            mapInstance.addLayer({
                id: 'line',
                source: 'line',
                type: 'line',
                paint: {
                    'line-width': 12,
                    'line-emissive-strength': 0.8,
                    'line-gradient': [
                        'interpolate',
                        ['linear'],
                        ['line-progress'],
                        0,
                        'red',
                        1,
                        'blue',
                    ],
                },
            });

            setMap(mapInstance);
        });

        return () => mapInstance.remove();
    }, []);

    // Update light presets
    useEffect(() => {
        if (!map) return;

        const lightSettings = {
            dawn: { anchor: 'map', color: '#f8c71c', intensity: 0.6 },
            day: { anchor: 'map', color: '#ffffff', intensity: 0.9 },
            dusk: { anchor: 'map', color: '#ff5500', intensity: 0.5 },
            night: { anchor: 'map', color: '#2d3f6b', intensity: 0.4 },
        };

        map.setLight(lightSettings[lightPreset]);
    }, [map, lightPreset]);

    // Update label visibility
    useEffect(() => {
        if (!map) return;

        const setLayerVisibility = (layerId, isVisible) => {
            const visibility = isVisible ? 'visible' : 'none';
            if (map.getLayer(layerId)) {
                map.setLayoutProperty(layerId, 'visibility', visibility);
            }
        };

        setLayerVisibility('place-label', placeLabels);
        setLayerVisibility('poi-label', poiLabels);
        setLayerVisibility('road-label', roadLabels);
        setLayerVisibility('transit-label', transitLabels);
    }, [map, placeLabels, poiLabels, roadLabels, transitLabels]);

    return (
        <div style={{ height: '100vh', position: 'relative' }}>
            <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
            <div className="map-overlay">
                <div className="map-overlay-inner">
                    <fieldset className="select-fieldset">
                        <label>Select light preset</label>
                        <select
                            value={lightPreset}
                            onChange={(e) => setLightPreset(e.target.value)}
                        >
                            <option value="dawn">Dawn</option>
                            <option value="day">Day</option>
                            <option value="dusk">Dusk</option>
                            <option value="night">Night</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="showPlaceLabels">Show place labels</label>
                        <input
                            type="checkbox"
                            id="showPlaceLabels"
                            checked={placeLabels}
                            onChange={(e) => setPlaceLabels(e.target.checked)}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="showPointOfInterestLabels">Show POI labels</label>
                        <input
                            type="checkbox"
                            id="showPointOfInterestLabels"
                            checked={poiLabels}
                            onChange={(e) => setPoiLabels(e.target.checked)}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="showRoadLabels">Show road labels</label>
                        <input
                            type="checkbox"
                            id="showRoadLabels"
                            checked={roadLabels}
                            onChange={(e) => setRoadLabels(e.target.checked)}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="showTransitLabels">Show transit labels</label>
                        <input
                            type="checkbox"
                            id="showTransitLabels"
                            checked={transitLabels}
                            onChange={(e) => setTransitLabels(e.target.checked)}
                        />
                    </fieldset>
                </div>
            </div>
            <style jsx>{`
                .map-overlay {
                    font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
                    position: absolute;
                    width: 200px;
                    top: 0;
                    left: 0;
                    padding: 10px;
                }

                .map-overlay .map-overlay-inner {
                    background-color: #fff;
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                    border-radius: 3px;
                    padding: 10px;
                    margin-bottom: 10px;
                }

                .map-overlay-inner fieldset {
                    display: flex;
                    justify-content: space-between;
                    border: none;
                }

                .map-overlay-inner label {
                    font-weight: bold;
                    margin-right: 10px;
                }

                .map-overlay-inner .select-fieldset {
                    display: block;
                }

                .map-overlay-inner .select-fieldset label {
                    display: block;
                    margin-bottom: 5px;
                }

                .map-overlay-inner .select-fieldset select {
                    width: 100%;
                }
            `}</style>
        </div>
    );
}
