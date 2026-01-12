import { getTour } from "@/app/actions/tour";
import { notFound } from "next/navigation";
import { Clock, MapPin, DollarSign } from "lucide-react";
import Link from "next/link";
import { TourGallery } from "@/components/public/TourGallery";
import Image from "next/image";
import TourMapWrapper from "@/components/public/TourMapWrapper";

interface TourDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export const dynamic = "force-dynamic";

export default async function TourDetailPage({ params }: TourDetailPageProps) {
    const { id } = await params;
    const tour = await getTour(id);

    if (!tour) {
        notFound();
    }

    const images = (tour.images as string[]) || [];

    return (
        <div className="bg-white min-h-screen pb-24">
            {/* Hero Gallery */}
            {/* Hero Gallery */}

            {/* Tour Title Overlay Content (Floating below gallery or integrated? ) 
                Wait, the previous design had the title OVER the image. 
                My TourGallery moves the image into a slider. 
                The title overlay logic needs to be either IN TourGallery or preserving the overlay here.
                Let's move the overlay logic INTO TourGallery OR overlay it here absolutely.
                However, TourGallery has `div className="relative ..."`
                If I put content here, it will be below.
                
                Actually, the cleanest way is to pass the title to TourGallery (which I did) 
                BUT TourGallery currently only uses title for Alt text and Lightbox header.
                It DOES NOT render the title overlay on the slider.
                
                I should probably UPDATE TourGallery to accept `children` or render the title overlay itself.
                OR I render the overlay HERE, positioned absolutely over the TourGallery if I wrap it?
                
                Let's look at `TourGallery` code again.
                It has `div className="relative h-[60vh] w-full group"`.
                
                I should probably render the Title/Info section BELOW the gallery or OVER it.
                The previous design had it at the bottom of the image.
                
                Let's update `TourGallery.tsx` to accept and render the overlay content, 
                OR just put the title details in the main content area below.
                
                Actually, standard modern design often has the Gallery separate, and Title below.
                OR Title over the gallery.
                
                Let's look at the user request: "Make photos as a slider".
                
                If I remove the overlay from here, the Title is gone!
                
                I will add a `children` prop to `TourGallery` or better yet, 
                keep the overlay logic in `page.tsx` but position it absolutely over the `TourGallery` wrapper?
                
                The `TourGallery` component returns a fragment `<> ... </>`.
                The first element is the slider `div`.
                
                Let's wrap `TourGallery` in a relative div here, and put the overlay content inside.
            */}

            <div className="relative">
                <TourGallery images={images} title={tour.title} />

                <div className="absolute inset-0 pointer-events-none z-10">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-12 max-w-7xl mx-auto pointer-events-auto">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 drop-shadow-lg leading-tight">
                                {tour.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-3 text-white/90 font-medium text-xs sm:text-sm md:text-base">
                                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-300" />
                                    <span>{tour.duration}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-300" />
                                    <span>{tour.location}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-amber-500/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/30">
                                    <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
                                    <span className="font-bold text-amber-100">${Number(tour.price).toFixed(0)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-lg">
                                {tour.description}
                            </p>
                        </div>

                        {/* Map Section */}
                        {(tour as any).locations && Array.isArray((tour as any).locations) && ((tour as any).locations as any[]).length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">Tour Route</h2>
                                <TourMapWrapper locations={(tour as any).locations as any[]} />
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 sticky top-24">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Book This Tour</h3>
                            <p className="text-slate-600 mb-6">Interested in this experience? Contact us to customize and book your trip.</p>

                            <div className="space-y-4">
                                <Link
                                    href="/contact"
                                    className="block w-full py-3 bg-blue-600 text-white text-center rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Contact Us
                                </Link>
                                <div className="text-center text-sm text-slate-500">
                                    or call us at <span className="font-semibold text-slate-700">+94 77 123 4567</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
