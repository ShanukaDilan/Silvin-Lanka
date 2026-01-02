"use client";

import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Tag } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function WhyChooseUs() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose Silvin Lanka?</h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full" />
                </AnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        {
                            icon: <Leaf className="w-12 h-12 text-teal-600" />,
                            title: "Sustainable Travel",
                            description: "We prioritize eco-friendly practices and support local communities to ensure your visit has a positive impact."
                        },
                        {
                            icon: <ShieldCheck className="w-12 h-12 text-blue-600" />,
                            title: "Expert Local Guides",
                            description: "Our guides are certified experts who know the island's secrets, ensuring a safe and authentic experience."
                        },
                        {
                            icon: <Tag className="w-12 h-12 text-purple-600" />,
                            title: "Best Value Guaranteed",
                            description: "We offer competitive pricing without compromising on quality, giving you the best memories for your budget."
                        }
                    ].map((feature, idx) => (
                        <AnimatedSection key={idx} delay={idx * 0.2} variant="scale-up" className="h-full">
                            <motion.div
                                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                                className="p-8 rounded-2xl bg-slate-50 border border-slate-100 text-center h-full flex flex-col items-center"
                            >
                                <div className="mb-6 inline-flex p-4 rounded-full bg-slate-100 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-slate-900">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
