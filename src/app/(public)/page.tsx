import { FeaturedTours } from "@/components/home/FeaturedTours";
import { HeroSection } from "@/components/home/HeroSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { PopularDestinations } from "@/components/home/PopularDestinations";
import { Newsletter } from "@/components/home/Newsletter";

export const dynamic = "force-dynamic";

export default function HomePage() {
    return (
        <div className="relative font-sans text-slate-800">
            <HeroSection />
            <WhyChooseUs />
            <PopularDestinations />

            {/* Featured Tours (Server Component) */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900">Featured Packages</h2>
                        <p className="text-slate-600 mt-4">Hand-picked experiences tailored to perfection.</p>
                    </div>
                    <FeaturedTours />
                </div>
            </section>

            <Newsletter />
        </div>
    );
}
