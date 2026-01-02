import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { StatCard } from "@/components/admin/StatCard";
import { Map, MessageSquare, Image as ImageIcon, TrendingUp, Users } from "lucide-react";
import { getDashboardStats, getRecentActivity } from "@/app/actions/dashboard";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);
    const firstName = session?.user?.name?.split(" ")[0] || "Admin";
    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";

    // Fetch real data
    const stats = await getDashboardStats();
    const recentActivity = await getRecentActivity();

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        {greeting}, {firstName} 👋
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg">
                        Here&apos;s what&apos;s happening with your tours today.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    System Operational
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Active Tours"
                    value={stats.tours}
                    icon={Map}
                    color="blue"
                    trend={{ value: "Live", isPositive: true, label: "Total packages" }}
                />
                <StatCard
                    title="Total Reviews"
                    value={stats.reviews}
                    icon={MessageSquare}
                    color="amber"
                    trend={{ value: "Feedback", isPositive: true, label: "Customer reviews" }}
                />
                <StatCard
                    title="Gallery Items"
                    value={stats.gallery}
                    icon={ImageIcon}
                    color="rose"
                    trend={{ value: "Assets", isPositive: true, label: "Total images" }}
                />
                <StatCard
                    title="Site Visitors"
                    value={stats.visitors}
                    icon={Users}
                    color="teal"
                    trend={{ value: "Traffic", isPositive: true, label: "Total page views" }}
                />
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-900">Recent Activity</h3>
                    </div>
                    <div className="space-y-4">
                        {recentActivity.length > 0 ? (
                            recentActivity.map((item, i) => (
                                <div key={item.id + i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                        <TrendingUp className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-900">{item.message}</p>
                                        <p className="text-xs text-slate-500">{formatDistanceToNow(new Date(item.time), { addSuffix: true })}</p>
                                    </div>
                                    <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-lg">
                                        {item.type}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-500 text-center py-8">No recent activity found.</p>
                        )}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl shadow-slate-900/20">
                    <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <Link href="/admin/tours/new" className="block w-full text-left px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium border border-white/5">
                            + Add New Tour
                        </Link>
                        <Link href="/admin/gallery" className="block w-full text-left px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium border border-white/5">
                            + Upload Photos
                        </Link>
                        <Link href="/admin/reviews" className="block w-full text-left px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium border border-white/5">
                            Check Reviews
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
