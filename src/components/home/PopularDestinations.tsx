"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface Destination {
    title: string;
    image: string;
    tag?: string | null;
    size: "large" | "normal" | "wide";
}

interface DestinationsProps {
    title?: string;
    subtitle?: string;
    destinations?: Destination[];
}

export function PopularDestinations({
    title = "Popular Destinations",
    subtitle = "Explore our most visited locations, curated just for you.",
    destinations = []
}: DestinationsProps) {
    // Fallback if no destinations provided
    const displayDestinations = (destinations && destinations.length > 0) ? destinations : [
        {
            title: "Sigiriya Rock Fortress",
            image: "/images/hero.png", // Fallback
            tag: "Cultural",
            size: "large"
        }
    ] as Destination[];

    const getSizeClasses = (size: string) => {
        switch (size) {
            case "large": return "md:col-span-2 md:row-span-2 h-96 md:h-full";
            case "wide": return "md:col-span-2 h-64";
            default: return "h-64";
        }
    };

    return (
        <section className="py-24 bg-slate-900 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="max-w-xl">
                        <h2 className="text-4xl font-bold mb-4">{title}</h2>
                        <p className="text-slate-400">{subtitle}</p>
                    </div>
                    <Link href="/tours" className="mt-6 md:mt-0 text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors">
                        View All Destinations <ArrowRight className="w-4 h-4" />
                    </Link>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
                    {displayDestinations.map((dest, idx) => (
                        <AnimatedSection
                            key={idx}
                            delay={idx * 0.1}
                            className={`relative rounded-2xl overflow-hidden group ${getSizeClasses(dest.size)}`}
                        >
                            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} className="absolute inset-0 h-full w-full">
                                {/* Use img tag or Next Image - for now using simple img tag with object-cover or background div */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${dest.image})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                                <div className="absolute bottom-6 left-6 z-20">
                                    {dest.tag && (
                                        <span className="px-3 py-1 bg-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                                            {dest.tag}
                                        </span>
                                    )}
                                    <h3 className={`font-bold ${dest.size === 'large' ? 'text-2xl' : 'text-lg'}`}>
                                        {dest.title}
                                    </h3>
                                </div>
                            </motion.div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
