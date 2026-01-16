import { getSiteProfile } from "@/app/actions/profile";
import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle } from "lucide-react";
import Image from "next/image";
import { validateImagePath } from "@/utils/image-validation";
import { ContactForm } from "@/components/contact/ContactForm";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
    const profile = await getSiteProfile();

    const heroImage = validateImagePath(
        profile?.contactHeroImage,
        'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070&auto=format&fit=crop'
    );

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{ backgroundColor: profile?.contactHeroColor || '#0f172a' }}
                >
                    {/* Dynamic Hero Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={heroImage}
                            alt="Contact Hero"
                            fill
                            className="object-cover opacity-60 mix-blend-overlay"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>
                <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-500/30 border border-slate-400/30 text-slate-100 text-sm font-medium mb-6 backdrop-blur-sm animate-fade-in-up">
                        <span>Get in Touch</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-md animate-fade-in-up-delay-1">Contact Us</h1>
                    <p className="text-lg md:text-xl text-slate-100 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delay-2 font-light">
                        We're here to help you plan your perfect Sri Lankan adventure.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900">Get in Touch</h2>
                        <p className="text-slate-600">
                            Have questions about our tours or want to plan a custom trip? Reach out to us!
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Email</h3>
                                    <p className="text-slate-600">{profile?.email || "info@silvinlanka.com"}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Phone</h3>
                                    <p className="text-slate-600">{profile?.phone || "+94 77 123 4567"}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Address</h3>
                                    <p className="text-slate-600">{profile?.address || "Colombo, Sri Lanka"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 flex gap-4">
                            {profile?.facebookUrl && (
                                <a href={profile.facebookUrl} target="_blank" rel="noreferrer" className="p-3 bg-slate-100 rounded-full text-slate-600 hover:bg-blue-600 hover:text-white transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </a>
                            )}
                            {profile?.instagramUrl && (
                                <a href={profile.instagramUrl} target="_blank" rel="noreferrer" className="p-3 bg-slate-100 rounded-full text-slate-600 hover:bg-pink-600 hover:text-white transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* WhatsApp Contact Card */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200 shadow-lg">
                            <div className="text-center space-y-6">
                                {/* WhatsApp Icon */}
                                <div className="inline-flex p-5 bg-green-500 rounded-full shadow-lg">
                                    <MessageCircle className="w-12 h-12 text-white" />
                                </div>

                                <div>
                                    <h2 className="text-3xl font-bold text-slate-900 mb-3">
                                        Chat with us on WhatsApp
                                    </h2>
                                    <p className="text-slate-600 text-lg leading-relaxed">
                                        Get instant responses and personalized tour recommendations!
                                    </p>
                                </div>

                                {/* WhatsApp Button */}
                                <a
                                    href={(() => {
                                        // Use whatsappNumber if available, otherwise fall back to phone
                                        const phone = profile?.whatsappNumber || profile?.phone || "+94771234567";
                                        // Remove all non-numeric characters except +
                                        const cleanPhone = phone.replace(/[^\d+]/g, '');
                                        // Pre-filled message
                                        const message = encodeURIComponent("Hi! I'm interested in learning more about your tours.");
                                        return `https://wa.me/${cleanPhone}?text=${message}`;
                                    })()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-white rounded-xl font-semibold text-lg hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 transform"
                                >
                                    <MessageCircle className="w-6 h-6" />
                                    Start WhatsApp Chat
                                </a>

                                <div className="pt-6 border-t border-green-200">
                                    <p className="text-sm text-slate-500 mb-2">Available on WhatsApp</p>
                                    <p className="text-lg font-semibold text-slate-700">
                                        {profile?.whatsappNumber || profile?.phone || "+94 77 123 4567"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Or Send Us a Message</h3>
                            <p className="text-slate-600 mb-6">Fill out the form below and we'll get back to you soon.</p>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
