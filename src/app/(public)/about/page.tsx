import { getSiteProfile } from "@/app/actions/profile";
import Image from "next/image";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
    const profile = await getSiteProfile();

    let heroImage = profile?.aboutHeroImage || 'https://images.unsplash.com/photo-1546708773-e529a6913435?q=80&w=2070&auto=format&fit=crop';

    // Validate uploaded image existence
    if (heroImage.startsWith('/uploads/')) {
        const filePath = path.join(process.cwd(), 'public', heroImage);
        if (!fs.existsSync(filePath)) {
            heroImage = 'https://placehold.co/1920x600/1e293b/ffffff?text=About+Us';
        }
    }

    const validHeroImage = heroImage;

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{ backgroundColor: profile?.aboutHeroColor || '#0f172a' }}
                >
                    {/* Dynamic Hero Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={validHeroImage}
                            alt="About Hero"
                            fill
                            className="object-cover opacity-60 mix-blend-overlay"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>
                <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-500/30 border border-slate-400/30 text-slate-100 text-sm font-medium mb-6 backdrop-blur-sm animate-fade-in-up">
                        <span>Our Story</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-md animate-fade-in-up-delay-1">About Us</h1>
                    <p className="text-lg md:text-xl text-slate-100 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delay-2 font-light">
                        Dedicated to providing the best travel experiences in Sri Lanka.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="prose prose-lg mx-auto text-slate-600 animate-fade-in-up-delay-2">
                    {profile?.aboutImage && (
                        <div className="relative h-96 w-full rounded-2xl overflow-hidden mb-12 shadow-md">
                            <Image
                                src={profile.aboutImage}
                                alt="About Us"
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    <div
                        dangerouslySetInnerHTML={{
                            __html: profile?.aboutText || "<p>Welcome to Silvin Lanka. We are dedicated to providing the best travel experiences in Sri Lanka.</p>"
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
