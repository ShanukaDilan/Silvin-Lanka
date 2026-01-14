"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader2, ArrowRight, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";

export function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/admin";
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (result?.error) {
                setError("Invalid email or password");
            } else {
                router.push(callbackUrl);
                router.refresh();
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

            <div className="relative z-10">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-slate-300">Sign in to manage your empire</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-3 bg-red-500/20 text-red-200 border border-red-500/30 rounded-xl text-sm font-medium text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    <div className="space-y-4">
                        <div className="relative group">
                            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                            <input
                                {...register("email")}
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-500 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-blue-500/50 focus:bg-slate-900/80 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                                required
                            />
                        </div>

                        <div className="relative group">
                            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                            <input
                                {...register("password")}
                                type="password"
                                placeholder="Password"
                                className="w-full bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-500 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-blue-500/50 focus:bg-slate-900/80 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                                required
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-medium hover:from-blue-500 hover:to-indigo-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-slate-400 text-sm">
                        Forgot your password? <a href="#" className="text-blue-300 hover:text-blue-200 transition-colors">Contact Support</a>
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
