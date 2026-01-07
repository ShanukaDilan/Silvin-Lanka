import { getTours } from "@/app/actions/tour";
import { getSiteProfile } from "@/app/actions/profile";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, MapPin, Sparkles, Star, Image as ImageIcon } from "lucide-react";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export default async function ToursPage() {
    const tours = await getTours();
    const profile = await getSiteProfile();

    let heroImage = profile?.toursHeroImage || 'https://images.unsplash.com/photo-1546708773-e529a6913435?q=80&w=2070&auto=format&fit=crop';

    // Validate uploaded image existence
    if (heroImage.startsWith('/uploads/')) {
        const filePath = path.join(process.cwd(), 'public', heroImage);
        if (!fs.existsSync(filePath)) {
            // console.log(`Hero image not found at: ${filePath}, falling back.`);
            heroImage = 'https://placehold.co/1920x600/1e293b/ffffff?text=Explore+Sri+Lanka';
        }
    }

    const validHeroImage = heroImage;

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{ backgroundColor: profile?.toursHeroColor || '#172554' }}
                >
                    {/* Dynamic Hero Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={validHeroImage}
                            alt="Tours Hero"
                            fill
                            className="object-cover opacity-60 mix-blend-overlay"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent" />
                </div>
                <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-100 text-sm font-medium mb-6 backdrop-blur-sm animate-fade-in-up">
                        <Sparkles className="w-4 h-4 text-blue-300" />
                        <span>Discover the Unseen</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight animate-fade-in-up-delay-1">
                        Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-teal-200">Sri Lanka</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-100 max-w-2xl mx-auto leading-relaxed px-4 animate-fade-in-up-delay-2 font-light">
                        Curated experiences that take you beyond the ordinary. Find your perfect adventure with our premium tour packages.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {tours.map((tour: any) => (
                        <div key={tour.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 border border-slate-100 flex flex-col h-full hover:-translate-y-2">
                            {/* Card Image */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                {tour.images && (tour.images as string[]).length > 0 ? (
                                    <Image
                                        src={(tour.images as string[])[0]}
                                        alt={tour.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                                        <span className="flex flex-col items-center gap-2">
                                            <ImageIcon className="w-8 h-8 opacity-20" />
                                            No Image
                                        </span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-bold text-slate-900 shadow-xl flex items-center gap-1">
                                    <span className="text-xs font-medium text-slate-500">$</span>
                                    {Number(tour.price).toFixed(0)}
                                </div>

                                {tour.isFeatured && (
                                    <div className="absolute top-4 left-4 bg-amber-400/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg flex items-center gap-1.5 border border-amber-300/50">
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        Featured
                                    </div>
                                )}
                            </div>

                            {/* Card Content */}
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4 uppercase tracking-wider">
                                    <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                                        {tour.duration}
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 truncate max-w-[150px]">
                                        <MapPin className="w-3.5 h-3.5 text-teal-500" />
                                        <span className="truncate">{tour.location}</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                                    {tour.title}
                                </h3>

                                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                                    {tour.description}
                                </p>

                                <Link
                                    href={`/tours/${tour.id}`}
                                    className="group/btn relative w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white py-3.5 px-6 rounded-2xl font-medium overflow-hidden transition-all hover:bg-blue-600"
                                >
                                    <span className="relative z-10 transition-transform duration-300 group-hover/btn:-translate-x-1">View Tour Details</span>
                                    <ArrowRight className="w-4 h-4 relative z-10 transition-all duration-300 opacity-0 -ml-4 group-hover/btn:opacity-100 group-hover/btn:ml-0 group-hover/btn:translate-x-0" />
                                </Link>
                            </div>
                        </div>
                    ))}
                    {tours.length === 0 && (
                        <div className="col-span-3 py-20 text-center">
                            <div className="inline-block p-6 rounded-full bg-slate-100 mb-4">
                                <Sparkles className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-medium text-slate-900 mb-2">No tours found</h3>
                            <p className="text-slate-500">Check back later for new adventures.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
