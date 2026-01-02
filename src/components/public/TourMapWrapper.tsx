"use client";

import dynamic from "next/dynamic";

const TourMap = dynamic(() => import("./TourMap"), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-slate-100 animate-pulse rounded-2xl" />
});

interface TourMapWrapperProps {
    locations: any[];
}

export default function TourMapWrapper({ locations }: TourMapWrapperProps) {
    return <TourMap locations={locations} />;
}
