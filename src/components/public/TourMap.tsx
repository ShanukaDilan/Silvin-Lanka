"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Leaflet Icon Fix for Next.js
const fixLeafletIcon = () => {
    // Only run on client
    if (typeof window === 'undefined') return;

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
};

interface TourMapProps {
    locations: { lat: number; lng: number; name?: string }[];
}

export default function TourMap({ locations }: TourMapProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);

    useEffect(() => {
        // Double check for client side
        if (typeof window === 'undefined') return;

        if (!mapContainerRef.current || locations.length === 0) return;

        // Initialize Map if not already initialized
        if (!mapInstanceRef.current) {
            fixLeafletIcon();

            // Default center
            const center: L.LatLngExpression = [7.8731, 80.7718];

            const map = L.map(mapContainerRef.current, {
                center: center,
                zoom: 7,
                scrollWheelZoom: false,
                attributionControl: false // Cleaner look
            });

            // Add OpenStreetMap Tile Layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            mapInstanceRef.current = map;
        }

        const map = mapInstanceRef.current;

        // Clear existing layers to prevent duplicates on updates
        map.eachLayer((layer) => {
            // Keep tile layer, remove markers
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        // Add Markers
        const markers: L.Marker[] = [];
        locations.forEach(loc => {
            const marker = L.marker([loc.lat, loc.lng]);
            if (loc.name) {
                marker.bindPopup(loc.name);
            }
            marker.addTo(map);
            markers.push(marker);
        });

        // Fit Bounds
        if (markers.length > 0) {
            const group = L.featureGroup(markers);
            map.fitBounds(group.getBounds(), { padding: [50, 50] });
        }

        // Cleanup function
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };

    }, [locations]);

    if (!locations || locations.length === 0) {
        return null; // Don't render map if no locations
    }

    return (
        <div
            ref={mapContainerRef}
            className="h-[400px] w-full rounded-2xl overflow-hidden z-0 relative border border-slate-100 shadow-inner"
        />
    );
}
