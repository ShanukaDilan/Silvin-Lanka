"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Map,
    Image as ImageIcon,
    MessageSquare,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronRight,
    Home
} from "lucide-react";
import { signOut } from "next-auth/react";
import { ModernButton } from "@/components/ui/FormElements";

// --- Configuration ---
const SIDEBAR_ITEMS = [
    { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { title: "Tours", href: "/admin/tours", icon: Map },
    { title: "Home Page", href: "/admin/home-page", icon: Home },
    { title: "Blog & Gallery", href: "/admin/gallery", icon: ImageIcon },
    { title: "Reviews", href: "/admin/reviews", icon: MessageSquare },
    { title: "Site Profile", href: "/admin/profile", icon: Settings },
];

// --- Sidebar Item Component ---
function SidebarItem({ item, isActive, isCollapsed }: { item: any, isActive: boolean, isCollapsed?: boolean }) {
    return (
        <Link
            href={item.href}
            className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 mb-1",
                isActive
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            )}
        >
            <div className={cn(
                "p-2 rounded-lg transition-colors",
                isActive ? "bg-white/10 text-white" : "bg-white border border-slate-100 text-slate-500 group-hover:text-slate-900 group-hover:border-slate-200"
            )}>
                <item.icon className="w-5 h-5" />
            </div>
            <span className={cn("font-medium text-sm", isCollapsed && "md:hidden")}>{item.title}</span>
            {isActive && (
                <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
            )}
        </Link>
    );
}

// --- Main Layout Shell ---
export function AdminShell({ children, user }: { children: React.ReactNode, user?: any }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Mobile Header */}
            <header className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 -ml-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <Menu className="w-6 h-6 text-slate-600" />
                    </button>
                    <span className="font-bold text-lg text-slate-800 tracking-tight">Silvin Lanka</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs ring-2 ring-white">
                    {user?.name?.[0] || "A"}
                </div>
            </header>

            {/* Sidebar (Desktop + Mobile Overlay) */}
            <>
                {/* Backdrop */}
                <div
                    className={cn(
                        "fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
                        isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                    onClick={() => setSidebarOpen(false)}
                />

                {/* Sidebar Panel */}
                <aside
                    className={cn(
                        "fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-slate-100 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] transform transition-transform duration-300 ease-in-out lg:translate-x-0",
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    )}
                >
                    <div className="flex flex-col h-full">
                        {/* Logo Area */}
                        <div className="p-6 pb-2">
                            <div className="flex items-center gap-3 px-2 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-900/20">
                                    <Map className="w-6 h-6" />
                                </div>
                                <div>
                                    <h1 className="font-bold text-xl text-slate-900 tracking-tight leading-none">Silvin Lanka</h1>
                                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Admin Panel</span>
                                </div>
                                <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex-1 px-4 overflow-y-auto custom-scrollbar">
                            <div className="space-y-1">
                                <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-2">Overview</p>
                                {SIDEBAR_ITEMS.slice(0, 1).map((item) => (
                                    <SidebarItem key={item.href} item={item} isActive={pathname === item.href} />
                                ))}

                                <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-6">Management</p>
                                {SIDEBAR_ITEMS.slice(1, 5).map((item) => (
                                    <SidebarItem key={item.href} item={item} isActive={pathname === item.href} />
                                ))}

                                <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-6">System</p>
                                {SIDEBAR_ITEMS.slice(5).map((item) => (
                                    <SidebarItem key={item.href} item={item} isActive={pathname === item.href} />
                                ))}
                            </div>
                        </div>

                        {/* User / Logout */}
                        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100 shadow-sm mb-3">
                                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100">
                                    {user?.name?.[0] || "A"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-900 truncate">{user?.name || "Admin User"}</p>
                                    <p className="text-xs text-slate-500 truncate">{user?.email || "admin@silvinlanka.com"}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => signOut()}
                                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </aside>
            </>

            {/* Main Content Area */}
            <main className={cn(
                "lg:pl-72 min-h-screen transition-all duration-300",
                isSidebarOpen ? "blur-sm lg:blur-0" : ""
            )}>
                <div className="p-4 sm:p-6 lg:p-10 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {children}
                </div>
            </main>
        </div>
    );
}
