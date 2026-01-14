import { LoginForm } from "@/components/auth/LoginForm";
import Image from "next/image";
import { Suspense } from "react";

export default function SignInPage() {
    return (
        <main className="min-h-screen relative flex items-center justify-center p-4">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src="https://images.unsplash.com/photo-1546708773-e57c8e89ed6c?auto=format&fit=crop&q=80&w=2541" // Sri Lanka Tea Plantation Scene
                    alt="Sri Lanka Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
            </div>

            {/* Content Login Form */}
            <div className="relative z-10 w-full max-w-md">
                <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
                    <LoginForm />
                </Suspense>
            </div>

            {/* Footer / Copyright */}
            <div className="absolute bottom-6 left-0 w-full text-center z-10">
                <p className="text-white/40 text-xs">
                    © {new Date().getFullYear()} Silvin Lanka. All rights reserved.
                </p>
            </div>
        </main>
    );
}
