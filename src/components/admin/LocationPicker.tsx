"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const MapSelector = dynamic(() => import("./MapSelector"), {
    ssr: false,
    loading: () => (
        <div className="h-[400px] w-full rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
        </div>
    ),
});

interface Location {
    lat: number;
    lng: number;
    name?: string;
}

interface LocationPickerProps {
    value?: Location[];
    onChange: (locations: Location[]) => void;
}

export function LocationPicker(props: LocationPickerProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700">Tour Locations</label>
                <span className="text-xs text-slate-500">Click on map to add points</span>
            </div>
            <MapSelector {...props} />
            {props.value && props.value.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {props.value.map((loc, i) => (
                        <div key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md border border-slate-200">
                            {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
