import { getReviews, approveReview, deleteReview } from "@/app/actions/review";
import { Check, Trash2, Star, Facebook, Instagram, Video } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
    const reviews = await getReviews();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Review Moderation</h1>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {reviews.map((review: any) => (
                    <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-lg text-slate-900">{review.name}</h3>
                                <div className="flex text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-300 fill-gray-300"}`} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-slate-600 leading-relaxed">{review.comment}</p>

                            <div className="flex gap-4 pt-2">
                                {review.facebookUrl && (
                                    <a href={review.facebookUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:opacity-80">
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                )}
                                {review.instagramUrl && (
                                    <a href={review.instagramUrl} target="_blank" rel="noreferrer" className="text-pink-600 hover:opacity-80">
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                )}
                                {review.tiktokUrl && (
                                    <a href={review.tiktokUrl} target="_blank" rel="noreferrer" className="text-black hover:opacity-80">
                                        <Video className="w-5 h-5" />
                                    </a>
                                )}
                            </div>

                            <div className="text-xs text-slate-400 pt-2">
                                Submitted on: {new Date(review.createdAt).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="flex md:flex-col gap-3 md:border-l border-slate-100 md:pl-6 justify-center min-w-[150px]">
                            {review.isApproved ? (
                                <div className="w-full py-2 px-4 bg-green-50 text-green-700 rounded-lg text-center text-sm font-medium border border-green-100">
                                    Approved
                                </div>
                            ) : (
                                <form action={async () => {
                                    "use server";
                                    await approveReview(review.id);
                                }}>
                                    <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                                        <Check className="w-4 h-4" />
                                        Approve
                                    </button>
                                </form>
                            )}

                            <form action={async () => {
                                "use server";
                                await deleteReview(review.id);
                            }}>
                                <button className="w-full py-2 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
                {reviews.length === 0 && (
                    <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-100">
                        No reviews found.
                    </div>
                )}
            </div>
        </div>
    );
}
