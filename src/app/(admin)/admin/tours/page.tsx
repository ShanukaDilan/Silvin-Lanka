import { getTours, deleteTour } from "@/app/actions/tour";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ToursPage() {
    const tours = await getTours();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Tours</h1>
                <Link
                    href="/admin/tours/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Create New Tour
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="text-left py-4 px-6 font-medium text-slate-500">Title</th>
                            <th className="text-left py-4 px-6 font-medium text-slate-500">Price</th>
                            <th className="text-left py-4 px-6 font-medium text-slate-500">Status</th>
                            <th className="text-right py-4 px-6 font-medium text-slate-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {tours.map((tour: any) => (
                            <tr key={tour.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="py-4 px-6 font-medium text-slate-900">{tour.title}</td>
                                <td className="py-4 px-6 text-slate-600">${Number(tour.price).toFixed(2)}</td>
                                <td className="py-4 px-6">
                                    {tour.isFeatured ? (
                                        <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full font-medium">Featured</span>
                                    ) : <span className="text-slate-400 text-sm">-</span>}
                                </td>
                                <td className="py-4 px-6 text-right space-x-2">
                                    <Link
                                        href={`/admin/tours/${tour.id}`}
                                        className="inline-flex p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Link>
                                    {/* Delete button usually needs a client component or form action. For simplicity using a form here */}
                                    <form action={async () => {
                                        "use server";
                                        await deleteTour(tour.id);
                                    }} className="inline-block">
                                        <button className="inline-flex p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {tours.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-8 text-center text-slate-500">No tours found. Create one to get started.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
