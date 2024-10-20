import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import Leaflet icons (as default ones may not load)
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import 'leaflet/dist/images/marker-shadow.png';

const NearbyPharmacies = () => {
  const [location, setLocation] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    // Fetch user's live location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation([position.coords.latitude, position.coords.longitude]);
          fetchNearbyPharmacies(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    }
  }, []);

  const fetchNearbyPharmacies = async (lat, lng) => {
    try {
      // Overpass API query to find nearby pharmacies within a radius of 1000 meters
      const overpassQuery = `
        [out:json];
        (
          node["amenity"="pharmacy"](around:10000, ${lat}, ${lng});
        );
        out body;
      `;
      
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: overpassQuery
      });
      const data = await response.json();
      
      const pharmacyLocations = data.elements.map(item => ({
        lat: item.lat,
        lon: item.lon,
        display_name: item.tags.name || 'Unnamed Pharmacy'
      }));
      
      setPharmacies(pharmacyLocations);
    } catch (error) {
      console.error("Error fetching pharmacies: ", error);
    }
  };

  // Default map center if geolocation is unavailable
  const defaultPosition = [19.229, 72.859]; // Borivali (W), Mumbai, India

  return (
    <div className="w-full h-96">
      <MapContainer
        center={location || defaultPosition}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* User's live location marker */}
        {location && (
          <Marker
            position={location}
            icon={L.icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
          >
            <Popup>Your location</Popup>
          </Marker>
        )}

        {/* Nearby pharmacies markers */}
        {pharmacies.map((pharmacy, idx) => (
          <Marker
            key={idx}
            position={[pharmacy.lat, pharmacy.lon]}
            icon={L.icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
          >
            <Popup>{pharmacy.display_name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default NearbyPharmacies;
