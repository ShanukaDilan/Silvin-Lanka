import { getApprovedReviews } from "@/app/actions/review";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { Star, Facebook, Instagram, Video, Quote } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
    const reviews = await getApprovedReviews();

    return (
        <div className="bg-white min-h-screen">
            <div className="relative h-[300px] flex items-center justify-center bg-amber-500">
                <div className="absolute inset-0 bg-black/20" />
                <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-white">Guest Reviews</h1>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <h2 className="text-2xl font-bold text-slate-900">What our guests say</h2>

                        <div className="space-y-6">
                            {reviews.map((review: any) => (
                                <div key={review.id} className="bg-slate-50 p-8 rounded-2xl relative">
                                    <Quote className="absolute top-8 right-8 w-8 h-8 text-slate-200" />
                                    <div className="flex items-center gap-1 text-amber-500 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-5 h-5 ${i < review.rating ? "fill-current" : "text-gray-300"}`} />
                                        ))}
                                    </div>
                                    <p className="text-slate-700 text-lg leading-relaxed italic mb-6">
                                        "{review.comment}"
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-slate-900">{review.name}</h4>
                                            <span className="text-sm text-slate-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex gap-3">
                                            {review.facebookUrl && <a href={review.facebookUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:opacity-80"><Facebook className="w-5 h-5" /></a>}
                                            {review.instagramUrl && <a href={review.instagramUrl} target="_blank" rel="noreferrer" className="text-pink-600 hover:opacity-80"><Instagram className="w-5 h-5" /></a>}
                                            {review.tiktokUrl && <a href={review.tiktokUrl} target="_blank" rel="noreferrer" className="text-black hover:opacity-80"><Video className="w-5 h-5" /></a>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {reviews.length === 0 && (
                                <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-2xl">
                                    No reviews yet. Be the first to review us!
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <ReviewForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
