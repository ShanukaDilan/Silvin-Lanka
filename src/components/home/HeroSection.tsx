"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
    title?: string;
    subtitle?: string;
    description?: string;
    backgroundImage?: string;
}

export function HeroSection({
    title = "Travel Beyond The Ordinary",
    subtitle = "Welcome to Sri Lanka",
    description = "Discover the hidden gems of the pearl of the Indian Ocean. From mist-covered mountains to pristine beaches, your journey begins here.",
    backgroundImage = "/images/hero.png"
}: HeroProps) {
    return (
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden py-20">
            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImage}
                    alt="Beautiful Sri Lanka Landscape"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30 w-full h-full" />
            </div>

            <div className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto mt-0 sm:mt-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex justify-center mb-6"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm sm:text-base font-medium text-white shadow-lg">
                        <Sparkles className="w-4 h-4 text-blue-300" />
                        <span>{subtitle}</span>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight leading-tight md:leading-none"
                    dangerouslySetInnerHTML={{
                        __html: title.includes("The Ordinary") ? title.replace("The Ordinary", `<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-teal-200">The Ordinary</span>`) : title
                    }}
                />

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl text-slate-100 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
                >
                    {description}
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
