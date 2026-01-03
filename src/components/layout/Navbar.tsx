"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar({ navColor }: { navColor?: string }) {
    const sessionObj = useSession();
    const session = sessionObj?.data;
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Convert hex to rgb to apply opacity
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Calculate contrast text color (Black or White) based on background luminance
    // Returns true if dark text should be used (light background)
    const useDarkText = (hex?: string) => {
        if (!hex) return true; // Default to dark text if unknown/white-ish defaults
        const rgb = hexToRgb(hex);
        if (!rgb) return true;

        // YIQ equation
        const yiq = ((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000;
        return yiq >= 128; // Light background -> Dark Text
    }

    const rgb = navColor ? hexToRgb(navColor) : null;
    // Top: Transparent/Very subtle (0.1). Scrolled: High opacity (0.9) glass
    const bgOpacity = isScrolled ? 0.9 : 0.1;
    const bgColor = rgb
        ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${bgOpacity})`
        : `rgba(255, 255, 255, ${bgOpacity})`;

    // Text Color Logic:
    // If NOT scrolled (Hero): Always White (assuming Hero is dark/image)
    // If Scrolled: Calculate based on navColor luminance
    const shouldUseDarkText = isScrolled && useDarkText(navColor || "#ffffff");
    const textColorClass = shouldUseDarkText ? "text-slate-900" : "text-white";
    const hoverColorClass = shouldUseDarkText ? "hover:text-slate-700" : "hover:text-white/80";
    const underlineClass = shouldUseDarkText ? "bg-slate-900" : "bg-white";
    const logoColorClass = shouldUseDarkText ? "text-slate-900" : "text-white";
    const mobileMenuButtonClass = shouldUseDarkText ? "text-slate-900 hover:bg-slate-200/50" : "text-white hover:bg-white/10";

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ backgroundColor: bgColor }}
            className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-md border-b ${isScrolled ? 'border-slate-200/20 shadow-sm' : 'border-white/20'}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <span className={`text-2xl font-bold tracking-wider transition-colors ${logoColorClass}`}>
                                SILVIN LANKA
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex flex-1 justify-center space-x-8">
                        {[
                            { name: 'Home', href: '/' },
                            { name: 'Tours', href: '/tours' },
                            { name: 'Gallery', href: '/gallery' },
                            { name: 'About', href: '/about' },
                            { name: 'Contact', href: '/contact' },
                            { name: 'Reviews', href: '/reviews' },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`px-3 py-2 text-sm font-medium transition-colors relative group ${textColorClass} ${hoverColorClass}`}
                            >
                                {item.name}
                                {pathname === item.href && (
                                    <motion.span
                                        layoutId="navbar-underline"
                                        className={`absolute bottom-0 left-0 w-full h-0.5 ${underlineClass}`}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${underlineClass}`} />
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Button */}
                    <div className="hidden sm:flex items-center">
                        {session ? (
                            <Link
                                href="/admin"
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${shouldUseDarkText
                                    ? "bg-slate-900 text-white hover:bg-slate-800 border-transparent"
                                    : "bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/20"
                                    }`}
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/api/auth/signin"
                                className={`px-4 py-2 text-sm font-medium transition-colors ${textColorClass} ${hoverColorClass}`}
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`p-2 rounded-md transition-colors ${mobileMenuButtonClass}`}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="sm:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            {[
                                { name: 'Home', href: '/' },
                                { name: 'Tours', href: '/tours' },
                                { name: 'Gallery', href: '/gallery' },
                                { name: 'About', href: '/about' },
                                { name: 'Contact', href: '/contact' },
                                { name: 'Reviews', href: '/reviews' },
                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${pathname === item.href
                                        ? "bg-white/20 text-white"
                                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-4 mt-4 border-t border-white/10">
                                {session ? (
                                    <Link
                                        href="/admin"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg text-base font-medium transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href="/api/auth/signin"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block w-full text-center bg-white text-slate-900 hover:bg-slate-100 px-5 py-3 rounded-lg text-base font-bold transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
