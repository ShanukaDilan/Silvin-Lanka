import { getDestination } from "@/app/actions/destination";
import { ImageSlider } from "@/components/ui/ImageSlider";
import { MapView } from "@/components/ui/MapView";
import { MapPin, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        id: string;
    }>
}

export default async function GalleryDetailPage({ params }: PageProps) {
    const { id } = await params;
    const destination = await getDestination(id);

    if (!destination) {
        notFound();
    }

    // Prepare images array
    let images: string[] = [];
    if (destination.images && Array.isArray(destination.images)) {
        images = destination.images as string[];
    } else if (destination.imageUrl) {
        images = [destination.imageUrl];
    }

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Minimalist Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 text-center">
                <Link href="/gallery" className="inline-flex items-center text-slate-400 hover:text-slate-900 transition-colors mb-6 text-sm font-medium tracking-wide">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    BACK TO GALLERY
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">{destination.title}</h1>

                <div className="flex items-center justify-center gap-6 text-slate-500 text-sm">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(destination.createdAt).toLocaleDateString()}
                    </div>
                    {destination.latitude && destination.longitude && (
                        <div className="flex items-center gap-2 text-teal-600 font-medium">
                            <MapPin className="w-4 h-4" />
                            Location Available
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

                {/* 1. Hero Slider (Centered, Wide) */}
                <div className="max-w-6xl mx-auto">
                    <ImageSlider images={images} />
                </div>

                {/* 2. Description (Centered, Readable Width) */}
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-xl font-semibold text-slate-900 mb-6 uppercase tracking-wider">About this Destination</h2>
                    <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                        {destination.description || "No description provided."}
                    </div>
                </div>

                {/* 3. Map Section (Bottom, Full Width Feel) */}
                {destination.latitude && destination.longitude && (
                    <div className="max-w-5xl mx-auto bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100">
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                            <div className="w-full md:w-1/3 space-y-4 text-center md:text-left">
                                <div className="inline-flex items-center justify-center md:justify-start gap-2 text-teal-600 font-bold uppercase tracking-widest text-sm mb-2">
                                    <MapPin className="w-5 h-5" />
                                    Explore Location
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">Find Us Here</h3>
                                <p className="text-slate-500">
                                    View the exact location on the map.
                                    Coordinates: <span className="font-mono text-slate-700">{destination.latitude.toFixed(4)}, {destination.longitude.toFixed(4)}</span>
                                </p>
                            </div>

                            <div className="w-full md:w-2/3 h-[400px] rounded-2xl overflow-hidden shadow-sm border border-slate-200 relative z-0">
                                <MapView
                                    initialLat={destination.latitude}
                                    initialLng={destination.longitude}
                                />
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
