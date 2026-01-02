import { DestinationForm } from "@/components/admin/DestinationForm";

export const dynamic = "force-dynamic";

export default function CreateDestinationPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Add New Destination</h1>
            </div>
            <DestinationForm />
        </div>
    );
}
