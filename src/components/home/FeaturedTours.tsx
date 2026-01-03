import { getFeaturedTours } from "@/app/actions/tour";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, MapPin } from "lucide-react";

export async function FeaturedTours() {
    const tours = await getFeaturedTours();

    if (!tours || tours.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 shadow-sm mx-4">
                <p className="text-slate-500">No featured tours available at the moment.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tours.map((tour: any) => (
                <div key={tour.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100 group">
                    <div className="relative h-64 overflow-hidden">
                        {tour.images && (tour.images as string[]).length > 0 ? (
                            <Image
                                src={(tour.images as string[])[0]}
                                alt={tour.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                                No Image
                            </div>
                        )}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-slate-900 shadow-sm">
                            ${Number(tour.price).toFixed(0)}
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {tour.duration}
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {tour.location}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {tour.title}
                        </h3>
                        <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                            {tour.description}
                        </p>

                        <Link
                            href={`/tours/${tour.id}`}
                            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                        >
                            View Details <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
