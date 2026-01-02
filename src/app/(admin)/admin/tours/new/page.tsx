import { TourForm } from "@/components/admin/TourForm";

export const dynamic = "force-dynamic";

export default function CreateTourPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Create New Tour</h1>
            </div>
            <TourForm />
        </div>
    );
}
