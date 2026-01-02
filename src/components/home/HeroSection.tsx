"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero.png"
                    alt="Beautiful Sri Lanka Landscape"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30 w-full h-full" />
            </div>

            <div className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto mt-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-2xl font-light mb-4 uppercase tracking-[0.2em]"
                >
                    Welcome to Sri Lanka
                </motion.h2>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight leading-tight md:leading-none"
                >
                    Travel Beyond<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-teal-200">The Ordinary</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl text-slate-100 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
                >
                    Discover the hidden gems of the pearl of the Indian Ocean.
                    From mist-covered mountains to pristine beaches, your journey begins here.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                >
                    <Link
                        href="/tours"
                        className="group px-8 py-4 bg-white text-slate-900 rounded-full font-semibold transition-all hover:bg-slate-100 flex items-center justify-center gap-2"
                    >
                        Start Exploring
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/contact"
                        className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full font-semibold transition-all border border-white/30 hover:border-white/50"
                    >
                        Tailor Made Trips
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
