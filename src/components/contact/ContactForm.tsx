"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSubmissionSchema, ContactSubmissionFormValues } from "@/lib/validations/contact";
import { createContactSubmission } from "@/app/actions/contact";
import { Loader2 } from "lucide-react";

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const form = useForm<ContactSubmissionFormValues>({
        resolver: zodResolver(contactSubmissionSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
        },
    });

    const onSubmit = async (data: ContactSubmissionFormValues) => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        const result = await createContactSubmission(data);

        if ("error" in result) {
            setSubmitStatus({ type: "error", message: result.error || "An error occurred" });
        } else {
            setSubmitStatus({
                type: "success",
                message: "Thank you for your message! We'll get back to you soon.",
            });
            form.reset();
        }

        setIsSubmitting(false);
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {submitStatus && (
                <div
                    className={`p-4 rounded-lg ${submitStatus.type === "success"
                        ? "bg-green-50 border border-green-200 text-green-800"
                        : "bg-red-50 border border-red-200 text-red-800"
                        }`}
                >
                    {submitStatus.message}
                </div>
            )}

            <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                    Name *
                </label>
                <input
                    id="name"
                    type="text"
                    {...form.register("name")}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                    placeholder="Your name"
                />
                {form.formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email *
                </label>
                <input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                    placeholder="your.email@example.com"
                />
                {form.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                    Phone (Optional)
                </label>
                <input
                    id="phone"
                    type="tel"
                    {...form.register("phone")}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                    placeholder="+94 77 123 4567"
                />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                    Message *
                </label>
                <textarea
                    id="message"
                    rows={5}
                    {...form.register("message")}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 resize-none"
                    placeholder="Tell us about your travel plans..."
                />
                {form.formState.errors.message && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSubmitting ? "Sending..." : "Send Message"}
            </button>
        </form>
    );
}
