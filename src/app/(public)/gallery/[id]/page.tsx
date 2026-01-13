"use client";

import { useEffect, useState } from "react";
import { getDestination } from "@/app/actions/destination";
import { ImageSlider } from "@/components/ui/ImageSlider";
import { MapView } from "@/components/ui/MapView";
import { MapPin, Calendar, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";

interface PageProps {
    params: Promise<{
        id: string;
    }>
}

export default function GalleryDetailPage({ params }: PageProps) {
    const [destination, setDestination] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resolvedParams = await params;
                const data = await getDestination(resolvedParams.id);
                if (!data) {
                    notFound();
                }
                setDestination(data);
            } catch (error) {
                console.error("Failed to fetch destination", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [params]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-64 bg-slate-200 rounded mb-4"></div>
                    <div className="h-96 w-full max-w-4xl bg-slate-200 rounded-xl"></div>
                </div>
            </div>
        );
    }

    if (!destination) return null;

    // Prepare images array
    let images: string[] = [];
    if (destination.images && Array.isArray(destination.images)) {
        images = destination.images as string[];
    } else if (destination.imageUrl) {
        images = [destination.imageUrl];
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 50 }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="bg-slate-50 min-h-screen pb-20"
        >
            {/* Header Section with subtle gradient */}
            <div className="bg-white border-b border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 text-center relative z-10">
                    <motion.div variants={itemVariants}>
                        <Link href="/gallery" className="inline-flex items-center text-slate-400 hover:text-slate-900 transition-colors mb-6 text-sm font-medium tracking-wide group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            BACK TO GALLERY
                        </Link>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                        {destination.title}
                    </motion.h1>

                    <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-slate-500 text-sm md:text-base">
                        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="font-medium">{new Date(destination.createdAt).toLocaleDateString()}</span>
                        </div>
                        {destination.latitude && destination.longitude && (
                            <div className="flex items-center gap-2 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-full border border-teal-100">
                                <MapPin className="w-4 h-4" />
                                <span className="font-medium">Location Available</span>
                            </div>
                        )}
                        <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                            <Share2 className="w-4 h-4" />
                            Share
                        </button>
                    </motion.div>
                </div>

                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-teal-50 rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 -mt-8 relative z-20">

                {/* 1. Hero Slider (Elevated) */}
                <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
                    <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform transition-transform hover:scale-[1.01] duration-500">
                        <ImageSlider images={images} />
                    </div>
                </motion.div>

                {/* 2. Description */}
                <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
                        <h2 className="text-sm font-bold text-blue-600 mb-6 uppercase tracking-widest text-center">About this Destination</h2>
                        <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed text-justify md:text-center">
                            {destination.description || "No description provided."}
                        </div>
                    </div>
                </motion.div>

                {/* 3. Map Section */}
                {destination.latitude && destination.longitude && (
                    <motion.div variants={itemVariants} className="max-w-6xl mx-auto mb-20">
                        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col md:flex-row">
                            <div className="w-full md:w-1/3 p-8 md:p-12 bg-slate-50 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100">
                                <div className="inline-flex items-center gap-2 text-teal-600 font-bold uppercase tracking-widest text-xs mb-4">
                                    <span className="w-8 h-0.5 bg-teal-500 rounded-full"></span>
                                    Explore
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-4">Find Us Here</h3>
                                <p className="text-slate-500 mb-8 leading-relaxed">
                                    Discover exactly where this paradise is located on the map. Plan your route and get ready for an adventure.
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-slate-600 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                        <MapPin className="w-5 h-5 text-red-500" />
                                        <span className="font-mono">{destination.latitude.toFixed(6)}, {destination.longitude.toFixed(6)}</span>
                                    </div>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${destination.latitude},${destination.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
                                    >
                                        Open in Google Maps
                                    </a>
                                </div>
                            </div>
                            <div className="w-full md:w-2/3 h-[400px] md:h-auto relative">
                                <MapView
                                    initialLat={destination.latitude}
                                    initialLng={destination.longitude}
                                />
                                {/* Overlay gradient for seamless edge */}
                                <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none hidden md:block"></div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
