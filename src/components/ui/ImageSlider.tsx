"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
    images: string[];
}

export function ImageSlider({ images }: ImageSliderProps) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: true })]);
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: "keepSnaps",
        dragFree: true,
    });

    const onThumbClick = React.useCallback(
        (index: number) => {
            if (!emblaMainApi || !emblaThumbsApi) return;
            emblaMainApi.scrollTo(index);
        },
        [emblaMainApi, emblaThumbsApi]
    );

    const onSelect = React.useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return;
        setSelectedIndex(emblaMainApi.selectedScrollSnap());
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
    }, [emblaMainApi, emblaThumbsApi]);

    React.useEffect(() => {
        if (!emblaMainApi) return;
        onSelect();
        emblaMainApi.on("select", onSelect);
        emblaMainApi.on("reInit", onSelect);
    }, [emblaMainApi, onSelect]);

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-64 bg-slate-100 flex items-center justify-center text-slate-400 rounded-lg">
                No Images
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {/* Main Slider */}
            <div className="relative group rounded-2xl overflow-hidden shadow-lg border border-slate-900/10">
                <div className="overflow-hidden" ref={emblaMainRef}>
                    <div className="flex bg-slate-100">
                        {images.map((src, index) => (
                            <div className="flex-[0_0_100%] min-w-0 relative aspect-[16/9] md:aspect-[21/9]" key={index}>
                                <Image
                                    src={src}
                                    alt={`Slide ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {images.length > 1 && (
                    <>
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-105"
                            onClick={() => emblaMainApi?.scrollPrev()}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-105"
                            onClick={() => emblaMainApi?.scrollNext()}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="overflow-hidden" ref={emblaThumbsRef}>
                    <div className="flex gap-3">
                        {images.map((src, index) => (
                            <div
                                key={index}
                                className={`
                                    relative flex-[0_0_100px] aspect-video cursor-pointer rounded-lg overflow-hidden transition-all duration-300
                                    ${index === selectedIndex ? "ring-2 ring-blue-500 opacity-100" : "opacity-60 hover:opacity-100"}
                                `}
                                onClick={() => onThumbClick(index)}
                            >
                                <Image
                                    src={src}
                                    alt={`Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
