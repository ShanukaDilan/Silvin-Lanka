import { FeaturedTours } from "@/components/home/FeaturedTours";
import { HeroSection } from "@/components/home/HeroSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { PopularDestinations } from "@/components/home/PopularDestinations";
import { Newsletter } from "@/components/home/Newsletter";
import { Testimonials } from "@/components/home/Testimonials";
import { getHomePage } from "@/app/actions/home";

export const dynamic = "force-dynamic";

export default async function HomePage() {
    const { data: homeData } = await getHomePage();

    return (
        <div className="relative font-sans text-slate-800">
            <HeroSection
                title={homeData?.heroTitle}
                subtitle={homeData?.heroSubtitle}
                description={homeData?.heroDescription}
                backgroundImage={homeData?.heroImage}
            />
            <WhyChooseUs
                title={homeData?.whyChooseUsTitle}
                features={homeData?.whyChooseUsFeatures as any}
            />
            <PopularDestinations
                title={homeData?.destinationsTitle}
                subtitle={homeData?.destinationsSubtitle}
                destinations={homeData?.popularDestinations as any}
            />

            {/* Featured Tours (Server Component - Content is dynamic from Tour model, but Title/Subtitle is from HomePage model) */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900">{homeData?.featuredToursTitle || "Featured Packages"}</h2>
                        <p className="text-slate-600 mt-4">{homeData?.featuredToursSubtitle || "Hand-picked experiences tailored to perfection."}</p>
                    </div>
                    <FeaturedTours />
                </div>
            </section>

            <Testimonials
                title={homeData?.testimonialsTitle}
                subtitle={homeData?.testimonialsSubtitle}
                testimonials={homeData?.testimonials as any}
            />

            <Newsletter
                title={homeData?.newsletterTitle}
                description={homeData?.newsletterDescription}
            />
        </div>
    );
}
