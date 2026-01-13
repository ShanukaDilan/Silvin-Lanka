"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// --- Types ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

// --- Components ---

export const FormLabel = ({ children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label
        className={cn("block text-sm font-medium text-slate-800 mb-1.5 ml-1", className)}
        {...props}
    >
        {children}
    </label>
);

export const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && <FormLabel htmlFor={props.id}>{label}</FormLabel>}
                <div className="relative group">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            "flex w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition-all duration-200",
                            "placeholder:text-slate-500",
                            "focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10",
                            "hover:border-slate-300",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            icon ? "pl-10" : "",
                            error ? "border-red-300 focus:border-red-500 focus:ring-red-100" : "",
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && <p className="mt-1.5 text-xs font-medium text-red-500 animate-in slide-in-from-top-1 fade-in">{error}</p>}
            </div>
        );
    }
);
FormInput.displayName = "FormInput";

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && <FormLabel htmlFor={props.id}>{label}</FormLabel>}
                <textarea
                    ref={ref}
                    className={cn(
                        "flex min-h-[120px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition-all duration-200",
                        "placeholder:text-slate-500",
                        "focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10",
                        "hover:border-slate-300",
                        "resize-y",
                        error ? "border-red-300 focus:border-red-500 focus:ring-red-100" : "",
                        className
                    )}
                    {...props}
                />
                {error && <p className="mt-1.5 text-xs font-medium text-red-500 animate-in slide-in-from-top-1 fade-in">{error}</p>}
            </div>
        );
    }
);
FormTextarea.displayName = "FormTextarea";

export const ModernButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, leftIcon, rightIcon, children, ...props }, ref) => {
        const variants = {
            primary: "bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] shadow-sm hover:shadow-md",
            secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] shadow-sm",
            outline: "bg-transparent text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900",
            danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 hover:border-red-200",
            ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        };

        const sizes = {
            sm: "h-9 px-3 text-xs rounded-lg",
            md: "h-11 px-5 text-sm rounded-xl",
            lg: "h-14 px-8 text-base rounded-2xl",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2",
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {!isLoading && leftIcon && <div className="mr-2">{leftIcon}</div>}
                {children}
                {!isLoading && rightIcon && <div className="ml-2">{rightIcon}</div>}
            </button>
        );
    }
);
ModernButton.displayName = "ModernButton";
