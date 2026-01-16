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

    const whatsappNumber = profile?.whatsappNumber || profile?.phone || "+94771234567";
    const cleanPhone = whatsappNumber.replace(/[^\d+]/g, '');
    const whatsappMessage = encodeURIComponent("Hi! I'm interested in learning more about your tours.");
    const whatsappLink = `https://wa.me/${cleanPhone}?text=${whatsappMessage}`;

    return (
        <div className="bg-white">
            {/* Hero Section with Parallax Effect */}
            <div className="relative h-[450px] md:h-[500px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{ backgroundColor: profile?.contactHeroColor || '#0f172a' }}
                >
                    <div className="absolute inset-0">
                        <Image
                            src={heroImage}
                            alt="Contact Hero"
                            fill
                            className="object-cover opacity-60 mix-blend-overlay"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-white" />
                </div>

                <div className="relative z-10 text-center max-w-5xl mx-auto px-4 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 border border-white/30 text-white text-sm font-medium mb-6 backdrop-blur-md shadow-lg animate-pulse-slow">
                        <MessageCircle className="w-4 h-4" />
                        <span>We're Online</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
                        Let's Connect
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-lg">
                        Chat with us instantly on WhatsApp or send us a message
                    </p>
                </div>
            </div>

            {/* Main Content - Desktop: 3 columns, Mobile: Stack */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-24">

                {/* Mobile: WhatsApp Card First (visible only on mobile) */}
                <div className="lg:hidden mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse-slow"></div>
                        <div className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 p-8 rounded-3xl shadow-2xl overflow-hidden">
                            {/* Large WhatsApp Logo Background */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                <svg viewBox="0 0 175.216 175.552" className="w-96 h-96">
                                    <path fill="white" d="M77.391 128.001c-9.337-4.946-19.419-11.788-27.643-20.005-8.211-8.215-15.053-18.297-20.005-27.643l6.872-6.872c4.093-4.093 4.093-10.736 0-14.83l-12.502-12.5c-4.093-4.093-10.736-4.093-14.83 0-10.122 10.125-10.122 26.54 0 36.664 21.212 21.213 55.496 55.497 76.708 76.709 10.125 10.122 26.54 10.122 36.664 0 4.093-4.094 4.093-10.737 0-14.831l-12.5-12.5c-4.094-4.093-10.737-4.093-14.831 0l-6.872 6.872z" />
                                    <path fill="white" d="M151.874 84.371c-2.813-27.801-15.746-53.667-36.438-72.828-8.814-8.162-20.582-13.102-33.107-13.102-21.132 0-39.568 13.662-46.129 32.653-1.186 3.431-.127 7.229 2.635 9.483l22.165 18.093c2.604 2.127 6.353 2.137 8.968.027 3.021-2.434 6.888-3.894 11.088-3.894 9.861 0 17.866 8.005 17.866 17.867 0 4.2-1.46 8.066-3.894 11.088-2.11 2.615-2.1 6.364.027 8.968l18.093 22.165c2.254 2.762 6.052 3.821 9.483 2.635 18.991-6.561 32.653-24.997 32.653-46.129-.001-2.709-.235-5.364-.661-7.956z" />
                                </svg>
                            </div>

                            <div className="relative text-center space-y-6">
                                {/* Animated Icon */}
                                <div className="relative inline-block">
                                    <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20"></div>
                                    <div className="relative bg-white p-6 rounded-full shadow-xl animate-bounce-slow">
                                        <MessageCircle className="w-16 h-16 text-green-600" />
                                    </div>
                                </div>

                                <div className="text-white">
                                    <h2 className="text-3xl font-bold mb-3">
                                        WhatsApp Us Now!
                                    </h2>
                                    <p className="text-green-50 text-lg leading-relaxed">
                                        Get instant replies and personalized tour plans
                                    </p>
                                </div>

                                {/* CTA Button */}
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/btn inline-flex items-center gap-3 px-10 py-5 bg-white text-green-600 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 w-full justify-center"
                                >
                                    <MessageCircle className="w-7 h-7 group-hover/btn:animate-bounce" />
                                    Start Chat
                                </a>

                                <div className="pt-6 border-t border-green-400/30">
                                    <p className="text-green-50 text-sm mb-2">Available 24/7</p>
                                    <p className="text-white text-xl font-semibold tracking-wide">
                                        {whatsappNumber}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop/Tablet: Three Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Contact Info Cards */}
                    <div className="lg:col-span-3 space-y-6 animate-slide-right">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Get in Touch</h2>

                        {/* Email Card */}
                        <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-blue-200 hover:-translate-y-1">
                            <div className="flex items-start gap-4">
                                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl text-blue-600 group-hover:scale-110 transition-transform duration-300">
                                    <Mail className="w-7 h-7" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-slate-900 text-lg mb-1">Email Us</h3>
                                    <a href={`mailto:${profile?.email}`} className="text-blue-600 hover:text-blue-700 font-medium break-all">
                                        {profile?.email || "info@silvinlanka.com"}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Phone Card */}
                        <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-purple-200 hover:-translate-y-1">
                            <div className="flex items-start gap-4">
                                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl text-purple-600 group-hover:scale-110 transition-transform duration-300">
                                    <Phone className="w-7 h-7" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-slate-900 text-lg mb-1">Call Us</h3>
                                    <a href={`tel:${profile?.phone}`} className="text-purple-600 hover:text-purple-700 font-medium">
                                        {profile?.phone || "+94 77 123 4567"}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Address Card */}
                        <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-orange-200 hover:-translate-y-1">
                            <div className="flex items-start gap-4">
                                <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl text-orange-600 group-hover:scale-110 transition-transform duration-300">
                                    <MapPin className="w-7 h-7" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-slate-900 text-lg mb-1">Visit Us</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {profile?.address || "Colombo, Sri Lanka"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="flex gap-4 pt-4">
                            {profile?.facebookUrl && (
                                <a
                                    href={profile.facebookUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-4 bg-white rounded-full text-slate-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border border-slate-100"
                                >
                                    <Facebook className="w-6 h-6" />
                                </a>
                            )}
                            {profile?.instagramUrl && (
                                <a
                                    href={profile.instagramUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-4 bg-white rounded-full text-slate-600 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border border-slate-100"
                                >
                                    <Instagram className="w-6 h-6" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Center Column: WhatsApp Hero Card (Desktop/Tablet Only) */}
                    <div className="hidden lg:block lg:col-span-5 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="sticky top-8">
                            <div className="relative group">
                                {/* Animated Glow Effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse-slow"></div>

                                <div className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 p-10 rounded-3xl shadow-2xl overflow-hidden">
                                    {/* Large WhatsApp Logo Background */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                        <svg viewBox="0 0 175.216 175.552" className="w-[500px] h-[500px]">
                                            <path fill="white" d="M77.391 128.001c-9.337-4.946-19.419-11.788-27.643-20.005-8.211-8.215-15.053-18.297-20.005-27.643l6.872-6.872c4.093-4.093 4.093-10.736 0-14.83l-12.502-12.5c-4.093-4.093-10.736-4.093-14.83 0-10.122 10.125-10.122 26.54 0 36.664 21.212 21.213 55.496 55.497 76.708 76.709 10.125 10.122 26.54 10.122 36.664 0 4.093-4.094 4.093-10.737 0-14.831l-12.5-12.5c-4.094-4.093-10.737-4.093-14.831 0l-6.872 6.872z" />
                                            <path fill="white" d="M151.874 84.371c-2.813-27.801-15.746-53.667-36.438-72.828-8.814-8.162-20.582-13.102-33.107-13.102-21.132 0-39.568 13.662-46.129 32.653-1.186 3.431-.127 7.229 2.635 9.483l22.165 18.093c2.604 2.127 6.353 2.137 8.968.027 3.021-2.434 6.888-3.894 11.088-3.894 9.861 0 17.866 8.005 17.866 17.867 0 4.2-1.46 8.066-3.894 11.088-2.11 2.615-2.1 6.364.027 8.968l18.093 22.165c2.254 2.762 6.052 3.821 9.483 2.635 18.991-6.561 32.653-24.997 32.653-46.129-.001-2.709-.235-5.364-.661-7.956z" />
                                        </svg>
                                    </div>

                                    <div className="relative text-center space-y-8">
                                        {/* Animated WhatsApp Icon */}
                                        <div className="relative inline-block">
                                            <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20"></div>
                                            <div className="absolute inset-0 bg-white rounded-full animate-pulse opacity-30"></div>
                                            <div className="relative bg-white p-8 rounded-full shadow-2xl transform hover:scale-110 transition-transform duration-300">
                                                <MessageCircle className="w-20 h-20 text-green-600" />
                                            </div>
                                        </div>

                                        <div className="text-white space-y-4">
                                            <h2 className="text-4xl font-bold leading-tight">
                                                Chat with us on<br />WhatsApp
                                            </h2>
                                            <p className="text-green-50 text-lg leading-relaxed">
                                                Get instant responses and personalized tour recommendations!
                                            </p>
                                        </div>

                                        {/* Primary CTA Button */}
                                        <a
                                            href={whatsappLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/btn inline-flex items-center gap-4 px-12 py-6 bg-white text-green-600 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/50"
                                        >
                                            <MessageCircle className="w-8 h-8 group-hover/btn:animate-bounce" />
                                            Start WhatsApp Chat
                                        </a>

                                        <div className="pt-8 border-t border-green-400/30">
                                            <p className="text-green-50 text-sm mb-2">Available 24/7 on WhatsApp</p>
                                            <p className="text-white text-2xl font-bold tracking-wide">
                                                {whatsappNumber}
                                            </p>
                                        </div>

                                        {/* Trust Indicators */}
                                        <div className="flex items-center justify-center gap-6 pt-6 text-green-50 text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                                                <span>Online Now</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                                                <span>Fast Reply</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:col-span-4 animate-slide-left" style={{ animationDelay: '0.3s' }}>
                        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100">
                            <div className="mb-8">
                                <h3 className="text-3xl font-bold text-slate-900 mb-3">Send a Message</h3>
                                <p className="text-slate-600 text-lg">
                                    Fill out the form and we'll get back to you within 24 hours.
                                </p>
                            </div>
                            <ContactForm />
                        </div>
                    </div>
                </div>

                {/* Floating WhatsApp Button (Mobile Only - appears on scroll) */}
                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="md:hidden fixed bottom-6 right-6 z-50 group"
                >
                    <div className="relative">
                        <div className="absolute -inset-2 bg-green-500 rounded-full blur-lg animate-pulse opacity-70"></div>
                        <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-5 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300">
                            <MessageCircle className="w-8 h-8 text-white group-hover:animate-bounce" />
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}
