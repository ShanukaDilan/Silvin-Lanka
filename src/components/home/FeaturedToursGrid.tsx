"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";

interface Tour {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: string;
    location: string;
    images: string[] | null;
    isFeatured: boolean;
}

export function FeaturedToursGrid({ tours }: { tours: Tour[] }) {
    if (!tours || tours.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 shadow-sm mx-4">
                <p className="text-slate-500">No featured tours available at the moment.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {tours.map((tour, index) => (
                <motion.div
                    key={tour.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group flex flex-col h-full"
                >
                    <div className="relative h-64 overflow-hidden">
                        {tour.images && tour.images.length > 0 ? (
                            <Image
                                src={tour.images[0]}
                                alt={tour.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                        ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                                No Image
                            </div>
                        )}

                        {/* Featured Badge */}
                        {tour.isFeatured && (
                            <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-950 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm z-10">
                                <Star className="w-3 h-3 fill-current" />
                                <span>Featured</span>
                            </div>
                        )}

                        {/* Price Badge */}
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-slate-900 shadow-sm z-10">
                            ${Number(tour.price).toFixed(0)}
                        </div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-3 font-medium">
                            <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md whitespace-nowrap">
                                <Clock className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                                {tour.duration}
                            </div>
                            <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md whitespace-nowrap max-w-[140px]">
                                <MapPin className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                                <span className="truncate">{tour.location}</span>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {tour.title}
                        </h3>
                        <p className="text-slate-600 text-sm line-clamp-2 mb-4 flex-grow leading-relaxed">
                            {tour.description}
                        </p>

                        <div className="mt-auto pt-4 border-t border-slate-100">
                            <Link
                                href={`/tours/${tour.id}`}
                                className="inline-flex items-center justify-center w-full bg-slate-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors group-hover:shadow-lg transform group-hover:-translate-y-0.5"
                            >
                                View Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
