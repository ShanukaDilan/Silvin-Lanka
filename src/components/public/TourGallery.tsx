"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Grid, X, Image as ImageIcon } from "lucide-react";

interface TourGalleryProps {
    images: string[];
    title: string;
}

export function TourGallery({ images, title }: TourGalleryProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    if (!images || images.length === 0) {
        return (
            <div className="relative h-[50vh] md:h-[70vh] w-full bg-slate-100 flex items-center justify-center text-slate-400">
                <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="w-12 h-12 opacity-20" />
                    <span>No images available</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="relative h-[50vh] md:h-[70vh] w-full group">
                {/* Carousel */}
                <div className="absolute inset-0 overflow-hidden" ref={emblaRef}>
                    <div className="flex h-full touch-pan-y">
                        {images.map((src, index) => (
                            <div key={index} className="flex-[0_0_100%] min-w-0 relative h-full">
                                <Image
                                    src={src}
                                    alt={`${title} - Image ${index + 1}`}
                                    fill
                                    priority={index === 0}
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Controls */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <button
                        onClick={scrollPrev}
                        className="pointer-events-auto p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white transition-colors border border-white/10"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="pointer-events-auto p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white transition-colors border border-white/10"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Indicators & Actions */}
                {/* Indicators & Actions */}

                {/* Dots - Bottom Center on Mobile, Bottom Left on Desktop */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-8 md:bottom-8 flex gap-2 z-20">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => emblaApi?.scrollTo(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 shadow-sm ${index === selectedIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* View All Button - Top Right on Mobile, Bottom Right on Desktop */}
                <div className="absolute top-4 right-4 md:top-auto md:bottom-8 md:right-8 z-20">
                    <button
                        onClick={() => setIsLightboxOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-md hover:bg-black/40 text-white rounded-full text-xs md:text-sm font-semibold transition-all border border-white/10 shadow-lg hover:scale-105"
                    >
                        <Grid className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="hidden md:inline">View All Photos ({images.length})</span>
                        <span className="md:hidden">{images.length}</span>
                    </button>
                </div>
            </div>

            {/* Lightbox / Grid View */}
            {isLightboxOpen && (
                <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
                    <div className="min-h-screen p-4 md:p-8">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8 sticky top-0 z-10 py-4 bg-black/95">
                            <h2 className="text-white text-xl font-bold">{title} Gallery</h2>
                            <button
                                onClick={() => setIsLightboxOpen(false)}
                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                            {images.map((src, index) => (
                                <div
                                    key={index}
                                    className="relative aspect-[4/3] group cursor-pointer rounded-xl overflow-hidden bg-slate-800"
                                >
                                    <Image
                                        src={src}
                                        alt={`${title} - Gallery ${index + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
