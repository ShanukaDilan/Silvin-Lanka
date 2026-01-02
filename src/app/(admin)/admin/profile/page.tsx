import { getSiteProfile } from "@/app/actions/profile";
import { SiteProfileForm } from "@/components/admin/SiteProfileForm";

export const dynamic = "force-dynamic";

export default async function SiteProfilePage() {
    const profile = await getSiteProfile();

    // Convert nulls to undefined to match FormTypes if needed, or rely on defaultValues logic
    const formattedProfile = profile ? {
        ...profile,
        aboutImage: profile.aboutImage || undefined,
        address: profile.address || undefined,
        facebookUrl: profile.facebookUrl || undefined,
        instagramUrl: profile.instagramUrl || undefined,
    } : undefined;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Site Profile</h1>
            </div>
            <p className="text-slate-500">Manage your "About Us" content and contact information.</p>

            <SiteProfileForm initialData={formattedProfile} />
        </div>
    );
}
