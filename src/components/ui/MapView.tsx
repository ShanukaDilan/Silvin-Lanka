"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import LocationPicker with SSR disabled
const MapPicker = dynamic(() => import("@/components/ui/LocationPicker").then((mod) => mod.LocationPicker), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-slate-100 animate-pulse rounded-lg flex items-center justify-center text-slate-400">Loading Map...</div>
});

export function MapView({ initialLat, initialLng }: any) {
    return (
        <MapPicker
            initialLat={initialLat}
            initialLng={initialLng}
            onLocationSelect={() => { }}
        />
    );
}
