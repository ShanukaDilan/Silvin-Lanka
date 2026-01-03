"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Quote } from "lucide-react";

interface Testimonial {
    name: string;
    role: string;
    comment: string;
    avatar: string; // URL
}

interface TestimonialsProps {
    title?: string;
    subtitle?: string;
    testimonials?: Testimonial[];
}

export function Testimonials({
    title = "What Our Guests Say",
    subtitle = "Real stories from real travelers.",
    testimonials = []
}: TestimonialsProps) {
    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">{title}</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, idx) => (
                        <AnimatedSection key={idx} delay={idx * 0.1} className="relative">
                            <div className="bg-slate-50 p-8 rounded-2xl relative h-full flex flex-col">
                                <Quote className="w-10 h-10 text-blue-100 mb-6 absolute top-6 right-6" />
                                <p className="text-slate-700 mb-8 italized flex-grow">"{item.comment}"</p>
                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                                        <img
                                            src={item.avatar}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{item.name}</h4>
                                        <p className="text-sm text-slate-500">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
