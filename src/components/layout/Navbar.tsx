"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const sessionObj = useSession();
    const session = sessionObj?.data;
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed w-full z-50 transition-all duration-300 bg-white/10 backdrop-blur-md border-b border-white/20"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-bold text-white tracking-wider">
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
                                className="px-3 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors relative group"
                            >
                                {item.name}
                                {pathname === item.href && (
                                    <motion.span
                                        layoutId="navbar-underline"
                                        className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Button */}
                    <div className="hidden sm:flex items-center">
                        {session ? (
                            <Link
                                href="/admin"
                                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-medium transition-all border border-white/20"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/api/auth/signin"
                                className="text-white hover:text-white/80 px-4 py-2 text-sm font-medium transition-colors"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white p-2 rounded-md hover:bg-white/10 transition-colors"
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
