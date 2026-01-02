import { TourForm } from "@/components/admin/TourForm";
import { getTour } from "@/app/actions/tour";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface EditTourPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditTourPage({ params }: EditTourPageProps) {
    const { id } = await params;
    const tour = await getTour(id);

    if (!tour) {
        notFound();
    }

    // Transform Prisma types to FormTypes (Decimal to number, Json to array)
    const formattedTour = {
        ...tour,
        price: Number(tour.price),
        images: (tour.images as string[]) || [],
        locations: (tour.locations as any) || [],
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Edit Tour</h1>
            </div>
            <TourForm initialData={formattedTour} />
        </div>
    );
}
