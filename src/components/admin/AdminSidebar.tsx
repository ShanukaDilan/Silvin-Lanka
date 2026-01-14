"use client";

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
    User,
    Home,
} from "lucide-react";
import { signOut } from "next-auth/react";

const sidebarGroups = [
    {
        title: "OVERVIEW",
        items: [
            {
                title: "Dashboard",
                href: "/admin",
                icon: LayoutDashboard,
            },
        ],
    },
    {
        title: "MANAGEMENT",
        items: [
            {
                title: "Tours",
                href: "/admin/tours",
                icon: Map,
            },
            {
                title: "Home Page",
                href: "/admin/home-page",
                icon: Home,
            },
            {
                title: "Blog & Gallery",
                href: "/admin/gallery",
                icon: ImageIcon,
            },
            {
                title: "Reviews",
                href: "/admin/reviews",
                icon: MessageSquare,
            },
            {
                title: "Media Manager",
                href: "/admin/media",
                icon: ImageIcon,
            },
        ],
    },
    {
        title: "SYSTEM",
        items: [
            {
                title: "Users",
                href: "/admin/users",
                icon: User,
            },
            {
                title: "Site Profile",
                href: "/admin/profile",
                icon: Settings,
            },
        ],
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full bg-slate-900 text-white w-64 fixed left-0 top-0 overflow-y-auto border-r border-slate-800">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-slate-800 rounded-lg">
                        <Map className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-none">Silvin Lanka</h1>
                        <span className="text-xs text-slate-400 font-medium">ADMIN PANEL</span>
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-8">
                {sidebarGroups.map((group) => (
                    <div key={group.title}>
                        <h3 className="text-xs font-bold text-slate-400 mb-4 px-4 tracking-wider">
                            {group.title}
                        </h3>
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group",
                                            isActive
                                                ? "bg-slate-800 text-white"
                                                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                        )}
                                    >
                                        <item.icon
                                            className={cn(
                                                "w-5 h-5 transition-colors",
                                                isActive ? "text-blue-400" : "text-slate-500 group-hover:text-blue-400"
                                            )}
                                        />
                                        <span className="font-medium text-sm">{item.title}</span>
                                        {isActive && (
                                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="p-4 mt-auto">
                <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-lg">
                            A
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">Admin User</p>
                            <p className="text-xs text-slate-400">admin@silvinlanka.com</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => signOut()}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 text-sm font-medium"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
