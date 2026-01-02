import { getDestinations, deleteDestination } from "@/app/actions/destination";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
    const destinations = await getDestinations();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Blog & Gallery</h1>
                <Link
                    href="/admin/gallery/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add New Item
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map((dest: any) => (
                    <div key={dest.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group">
                        <div className="relative h-48">
                            <Image
                                src={dest.imageUrl}
                                alt={dest.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg text-slate-800 mb-1">{dest.title}</h3>
                            <p className="text-slate-500 text-sm line-clamp-2 mb-4">{dest.description || "No description provided."}</p>

                            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                                <div className="text-xs text-slate-400">
                                    {dest.latitude && dest.longitude ? "Has Location" : "No Location"}
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        href={`/admin/gallery/${dest.id}`}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Link>
                                    <form action={async () => {
                                        "use server";
                                        await deleteDestination(dest.id);
                                    }}>
                                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {destinations.length === 0 && (
                <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-100">
                    No items found. Create one to get started.
                </div>
            )}
        </div>
    );
}
