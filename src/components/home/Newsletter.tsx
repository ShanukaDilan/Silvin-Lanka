"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface NewsletterProps {
    title?: string;
    description?: string;
}

export function Newsletter({
    title = "Ready to start your adventure?",
    description = "Sign up for our newsletter to get the latest travel tips, special offers, and hidden gems of Sri Lanka delivered to your inbox."
}: NewsletterProps) {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-900 z-0">
                <div className="absolute inset-0 opacity-20 bg-[url('/images/pattern.svg')]"></div>
            </div>
            <div className="max-w-4xl mx-auto px-4 relative z-10 text-center text-white">
                <AnimatedSection>
                    <h2 className="text-4xl font-bold mb-6">{title}</h2>
                    <p className="text-lg md:text-xl text-blue-100 mb-10">
                        {description}
                    </p>
                    <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                        />
                        <button className="px-8 py-4 bg-white text-blue-900 rounded-full font-bold hover:bg-blue-50 transition-colors w-full sm:w-auto">
                            Subscribe
                        </button>
                    </form>
                </AnimatedSection>
            </div>
        </section>
    );
}
