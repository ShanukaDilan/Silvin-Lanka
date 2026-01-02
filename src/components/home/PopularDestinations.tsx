"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function PopularDestinations() {
    return (
        <section className="py-24 bg-slate-900 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="max-w-xl">
                        <h2 className="text-4xl font-bold mb-4">Popular Destinations</h2>
                        <p className="text-slate-400">Explore our most visited locations, curated just for you.</p>
                    </div>
                    <Link href="/tours" className="mt-6 md:mt-0 text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors">
                        View All Destinations <ArrowRight className="w-4 h-4" />
                    </Link>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
                    <AnimatedSection delay={0.1} className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group h-64 md:h-full">
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} className="absolute inset-0 h-full w-full">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                            <div className="absolute inset-0 bg-slate-800" />
                            <div className="absolute bottom-6 left-6 z-20">
                                <span className="px-3 py-1 bg-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">Cultural</span>
                                <h3 className="text-2xl font-bold">Sigiriya Rock Fortress</h3>
                            </div>
                        </motion.div>
                    </AnimatedSection>
                    <AnimatedSection delay={0.2} className="relative rounded-2xl overflow-hidden group h-64 md:h-full">
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} className="absolute inset-0 h-full w-full">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                            <div className="absolute inset-0 bg-slate-700" />
                            <div className="absolute bottom-4 left-4 z-20">
                                <h3 className="text-lg font-bold">Ella Nine Arch Bridge</h3>
                            </div>
                        </motion.div>
                    </AnimatedSection>
                    <AnimatedSection delay={0.3} className="relative rounded-2xl overflow-hidden group h-64 md:h-full">
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} className="absolute inset-0 h-full w-full">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                            <div className="absolute inset-0 bg-slate-600" />
                            <div className="absolute bottom-4 left-4 z-20">
                                <h3 className="text-lg font-bold">Mirissa Beach</h3>
                            </div>
                        </motion.div>
                    </AnimatedSection>
                    <AnimatedSection delay={0.4} className="md:col-span-2 relative rounded-2xl overflow-hidden group h-64 md:h-full">
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} className="absolute inset-0 h-full w-full">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                            <div className="absolute inset-0 bg-slate-500" />
                            <div className="absolute bottom-6 left-6 z-20">
                                <span className="px-3 py-1 bg-green-600 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">Wildlife</span>
                                <h3 className="text-2xl font-bold">Yala National Park</h3>
                            </div>
                        </motion.div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
