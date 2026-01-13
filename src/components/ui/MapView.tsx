import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    { ssr: false }
);
const Popup = dynamic(
    () => import("react-leaflet").then((mod) => mod.Popup),
    { ssr: false }
);

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

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

interface MapViewProps {
    initialLat?: number;
    initialLng?: number;
    locations?: Location[];
}

export function MapView({ initialLat, initialLng, locations = [] }: MapViewProps) {
    // Combine single lat/lng with locations array
    const allLocations = [...locations];
    if (initialLat && initialLng) {
        // Avoid duplicate if it's already in locations? 
        // Assuming if locations is present, initialLat/Lng might be just center or legacy.
        // Let's just include all uniquely.
        const exists = allLocations.some(l => Math.abs(l.lat - initialLat) < 0.0001 && Math.abs(l.lng - initialLng) < 0.0001);
        if (!exists) {
            allLocations.push({ lat: initialLat, lng: initialLng });
        }
    }

    const centerPos: [number, number] = allLocations.length > 0
        ? [allLocations[0].lat, allLocations[0].lng]
        : [7.8731, 80.7718];

    // Fix for SSR Leaflet window check
    useEffect(() => {
        // Any leaflet init if needed
    }, []);

    if (typeof window === 'undefined') {
        return (
            <div className="h-full w-full bg-slate-100 animate-pulse rounded-lg flex items-center justify-center text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="h-full w-full rounded-lg overflow-hidden border border-slate-200 z-0">
            <MapContainer center={centerPos} zoom={allLocations.length > 0 ? 10 : 7} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {allLocations.map((loc, index) => (
                    <Marker key={index} position={[loc.lat, loc.lng]} icon={customIcon}>
                        <Popup>
                            <span className="font-medium text-xs">
                                {loc.name || `Location ${index + 1}`}
                            </span>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
