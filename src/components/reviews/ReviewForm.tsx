"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema, ReviewFormValues } from "@/lib/validations/review";
import { createReview } from "@/app/actions/review";
import { useState } from "react";
import { Star, Loader2 } from "lucide-react";

export function ReviewForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [rating, setRating] = useState(5);

    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewSchema) as any,
        defaultValues: {
            name: "",
            email: "",
            rating: 5,
            comment: "",
            facebookUrl: "",
            instagramUrl: "",
            tiktokUrl: "",
        },
    });

    // Sync state rating with form
    const handleRatingChange = (value: number) => {
        setRating(value);
        form.setValue("rating", value);
    };

    const onSubmit = async (data: ReviewFormValues) => {
        setIsSubmitting(true);
        const res = await createReview(data);
        setIsSubmitting(false);

        if (res.success) {
            setIsSuccess(true);
            form.reset();
            setRating(5);
        } else {
            alert("Failed to submit review. Please try again.");
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-green-50 p-8 rounded-2xl text-center border border-green-100">
                <h3 className="text-xl font-bold text-green-700 mb-2">Thank you!</h3>
                <p className="text-green-600">Your review has been submitted and is pending approval.</p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 text-sm text-green-700 hover:underline"
                >
                    Submit another review
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Share Your Experience</h3>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingChange(star)}
                            className={`focus:outline-none transition-transform hover:scale-110 ${star <= rating ? "text-yellow-400" : "text-slate-300"}`}
                        >
                            <Star className="w-8 h-8 fill-current" />
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                    <input
                        {...form.register("name")}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {form.formState.errors.name && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                        {...form.register("email")}
                        type="email"
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {form.formState.errors.email && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Comment</label>
                <textarea
                    {...form.register("comment")}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                />
                {form.formState.errors.comment && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.comment.message}</p>
                )}
            </div>

            <div className="pt-2 border-t border-slate-200">
                <p className="text-sm text-slate-500 mb-4">Optional: Share your social media so we can tag you!</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        {...form.register("facebookUrl")}
                        placeholder="Facebook Link"
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <input
                        {...form.register("instagramUrl")}
                        placeholder="Instagram Link"
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <input
                        {...form.register("tiktokUrl")}
                        placeholder="TikTok Link"
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                Submit Review
            </button>
        </form>
    );
}
