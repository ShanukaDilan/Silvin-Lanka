import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { getSiteProfile } from "@/app/actions/profile";

export const dynamic = "force-dynamic";

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const profile = await getSiteProfile();

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar navColor={profile?.navColor || undefined} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}
