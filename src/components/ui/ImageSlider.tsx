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
            <div className="relative group rounded-2xl md:rounded-3xl overflow-hidden shadow-sm bg-slate-900 aspect-[16/9] md:aspect-[2/1] lg:aspect-[2.4/1]">
                <div className="overflow-hidden h-full" ref={emblaMainRef}>
                    <div className="flex bg-slate-900 h-full">
                        {images.map((src, index) => (
                            <div className="flex-[0_0_100%] min-w-0 relative h-full" key={index}>
                                <Image
                                    src={src}
                                    alt={`Slide ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                                />
                                {/* Gradient Overlay for text visibility if needed in future */}
                                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            </div>
                        ))}
                    </div>
                </div>

                {images.length > 1 && (
                    <>
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/30 text-white p-3 md:p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 border border-white/20 shadow-lg"
                            onClick={(e) => { e.stopPropagation(); emblaMainApi?.scrollPrev(); }}
                        >
                            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/30 text-white p-3 md:p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 border border-white/20 shadow-lg"
                            onClick={(e) => { e.stopPropagation(); emblaMainApi?.scrollNext(); }}
                        >
                            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </>
                )}

                {/* Slide Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                    {selectedIndex + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="overflow-hidden px-1" ref={emblaThumbsRef}>
                    <div className="flex gap-3">
                        {images.map((src, index) => (
                            <div
                                key={index}
                                className={`
                                    relative flex-[0_0_80px] md:flex-[0_0_120px] aspect-[4/3] cursor-pointer rounded-xl overflow-hidden transition-all duration-300 border-2
                                    ${index === selectedIndex
                                        ? "border-blue-500 shadow-lg shadow-blue-500/20 scale-105 opacity-100 z-10"
                                        : "border-transparent opacity-60 hover:opacity-100 scale-100 grayscale hover:grayscale-0"}
                                `}
                                onClick={() => onThumbClick(index)}
                            >
                                <Image
                                    src={src}
                                    alt={`Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="120px"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
