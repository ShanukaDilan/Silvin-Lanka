import { DestinationForm } from "@/components/admin/DestinationForm";
import { getDestination } from "@/app/actions/destination";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface EditDestinationPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditDestinationPage({ params }: EditDestinationPageProps) {
    const { id } = await params;
    const destination = await getDestination(id);

    if (!destination) {
        notFound();
    }

    // Prepare images array
    let images: string[] = [];
    if (destination.images && Array.isArray(destination.images)) {
        images = destination.images as string[];
    } else if (destination.imageUrl) {
        images = [destination.imageUrl];
    }

    const formattedDestination = {
        ...destination,
        description: destination.description || undefined,
        latitude: destination.latitude ?? undefined,
        longitude: destination.longitude ?? undefined,
        images: images,
        imageUrl: destination.imageUrl ?? undefined,
        locations: (destination.locations as any) ?? [],
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Edit Destination</h1>
            </div>
            <DestinationForm initialData={formattedDestination} />
        </div>
    );
}
