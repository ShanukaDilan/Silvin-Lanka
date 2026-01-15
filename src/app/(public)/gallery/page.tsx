import { getDestinations } from "@/app/actions/destination";
import { getSiteProfile } from "@/app/actions/profile";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { validateImagePath } from "@/utils/image-validation";
import type { Destination } from "@/types";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
    const destinations = await getDestinations();
    const profile = await getSiteProfile();

    const heroImage = validateImagePath(
        profile?.galleryHeroImage,
        'https://images.unsplash.com/photo-1546708773-e529a6913435?q=80&w=2070&auto=format&fit=crop'
    );

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{ backgroundColor: profile?.galleryHeroColor || '#042f2e' }}
                >
                    {/* Dynamic Hero Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={heroImage}
                            alt="Gallery Hero"
                            fill
                            className="object-cover opacity-60 mix-blend-overlay"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>
                <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-100 text-sm font-medium mb-6 backdrop-blur-sm animate-fade-in-up">
                        <MapPin className="w-4 h-4 text-teal-300" />
                        <span>Visual Journey</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-md animate-fade-in-up-delay-1">
                        Gallery & Blog
                    </h1>
                    <p className="text-lg md:text-xl text-slate-100 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delay-2 font-light">
                        Visual stories and travel guides from across the island.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {destinations.map((dest) => (
                        <div key={dest.id} className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100 group">
                            <div className="relative w-full aspect-[4/3] overflow-hidden">
                                <Image
                                    src={dest.imageUrl || '/images/placeholder.jpg'}
                                    alt={dest.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                                    {dest.title}
                                </h3>
                                {dest.description && (
                                    <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                                        {dest.description}
                                    </p>
                                )}

                                <div className="flex items-center justify-between mt-4 border-t border-slate-100 pt-4">
                                    <Link
                                        href={`/gallery/${dest.id}`}
                                        className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700 transition-colors text-sm"
                                    >
                                        Read More <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                    {(dest.latitude && dest.longitude) && (
                                        <div className="flex items-center text-xs text-slate-400 gap-1">
                                            <MapPin className="w-3 h-3" />
                                            Location
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {destinations.length === 0 && (
                        <div className="col-span-3 text-center py-12 text-slate-500">
                            No gallery items found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
