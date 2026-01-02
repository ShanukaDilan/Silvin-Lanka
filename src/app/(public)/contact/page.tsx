import { getSiteProfile } from "@/app/actions/profile";
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
    const profile = await getSiteProfile();

    return (
        <div className="bg-white">
            <div className="relative h-[400px] flex items-center justify-center">
                <div className="absolute inset-0 bg-slate-900" />
                <div className="absolute inset-0 bg-black/50" />
                <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-white">Contact Us</h1>
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

                    {/* Contact Form Placeholder */}
                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input type="email" className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                                <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <button type="button" className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
