"use client";

import { useMapEvents, MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";

// Fix Leaflet marker icons in Next.js
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

const customIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

interface Location {
    lat: number;
    lng: number;
    name?: string;
}

interface MapSelectorProps {
    value?: Location[];
    onChange: (locations: Location[]) => void;
}

function ClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

export default function MapSelector({ value = [], onChange }: MapSelectorProps) {
    const handleMapClick = (lat: number, lng: number) => {
        onChange([...value, { lat, lng }]);
    };

    const removeLocation = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    return (
        <div className="h-[400px] w-full rounded-lg overflow-hidden border border-slate-200 z-0 relative">
            <MapContainer center={[7.8731, 80.7718]} zoom={7} className="h-full w-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <ClickHandler onMapClick={handleMapClick} />
                {value.map((loc, index) => (
                    <Marker key={`${loc.lat}-${loc.lng}-${index}`} position={[loc.lat, loc.lng]} icon={customIcon}>
                        <Popup>
                            <div className="flex flex-col gap-2">
                                <span className="font-medium text-xs">Location {index + 1}</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeLocation(index);
                                    }}
                                    type="button"
                                    className="text-xs text-red-500 hover:text-red-700 underline"
                                >
                                    Remove
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
