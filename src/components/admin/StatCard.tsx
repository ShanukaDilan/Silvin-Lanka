import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: string;
        isPositive: boolean;
        label: string;
    };
    color?: "default" | "blue" | "teal" | "amber" | "rose" | "indigo";
}

export function StatCard({ title, value, icon: Icon, trend, color = "default" }: StatCardProps) {
    const colorStyles = {
        default: "text-slate-600 bg-slate-50",
        blue: "text-blue-600 bg-blue-50",
        teal: "text-teal-600 bg-teal-50",
        amber: "text-amber-600 bg-amber-50",
        rose: "text-rose-600 bg-rose-50",
        indigo: "text-indigo-600 bg-indigo-50",
    };

    return (
        <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-100 group">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-sm font-medium text-slate-500">{title}</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-slate-900 tracking-tight">{value}</span>
                        {trend && (
                            <span className={cn(
                                "flex items-center text-xs font-medium rounded-full px-2 py-0.5",
                                trend.isPositive ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
                            )}>
                                {trend.isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                {trend.value}
                            </span>
                        )}
                    </div>
                    {trend && (
                        <p className="mt-1 text-xs text-slate-400">{trend.label}</p>
                    )}
                </div>
                <div className={cn("p-3 rounded-xl transition-colors", colorStyles[color])}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>

            {/* Decorative background circle */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
    );
}
