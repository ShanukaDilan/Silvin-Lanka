import { getApprovedReviews } from "@/app/actions/review";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { Star, Facebook, Instagram, Video, Quote, Sparkles } from "lucide-react";
import { getSiteProfile } from "@/app/actions/profile";
import Image from "next/image";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
    const reviews = await getApprovedReviews();
    const profile = await getSiteProfile();

    let heroImage = profile?.reviewsHeroImage || 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=2070&auto=format&fit=crop';

    // Validate uploaded image existence
    if (heroImage.startsWith('/uploads/')) {
        const filePath = path.join(process.cwd(), 'public', heroImage);
        if (!fs.existsSync(filePath)) {
            heroImage = 'https://placehold.co/1920x600/f59e0b/ffffff?text=Guest+Reviews';
        }
    }

    const validHeroImage = heroImage;

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{ backgroundColor: profile?.reviewsHeroColor || '#f59e0b' }}
                >
                    {/* Dynamic Hero Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={validHeroImage}
                            alt="Reviews Hero"
                            fill
                            className="object-cover opacity-60 mix-blend-overlay"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>
                <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-100 text-sm font-medium mb-6 backdrop-blur-sm animate-fade-in-up">
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Trusted by Travelers</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-md animate-fade-in-up-delay-1">Guest Reviews</h1>
                    <p className="text-lg md:text-xl text-slate-100 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delay-2 font-light">
                        Real stories from real travelers who explored Sri Lanka with us.
                    </p>
                </div>
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
