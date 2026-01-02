"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { destinationSchema, DestinationFormValues } from "@/lib/validations/destination";
import { createDestination, updateDestination } from "@/app/actions/destination";
import { uploadImagesAction } from "@/app/actions/upload";
import { useState } from "react";
import Image from "next/image";
import { Loader2, X, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { LocationPicker } from "@/components/admin/LocationPicker";

interface DestinationFormProps {
    initialData?: DestinationFormValues & { id: string };
}

export function DestinationForm({ initialData }: DestinationFormProps) {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const form = useForm<DestinationFormValues>({
        resolver: zodResolver(destinationSchema) as any,
        defaultValues: initialData || {
            title: "",
            description: "",
            imageUrl: "",
            images: [],
            locations: [],
            latitude: undefined,
            longitude: undefined,
        },
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        const newImages = [...(form.getValues("images") || [])];
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        try {
            const res = await uploadImagesAction(formData);
            if (res.urls && Array.isArray(res.urls)) {
                const updatedImages = [...newImages, ...res.urls];
                form.setValue("images", updatedImages);
                // Set the first image as the main imageUrl (legacy/display)
                if (updatedImages.length > 0) {
                    form.setValue("imageUrl", updatedImages[0]);
                }
            } else {
                console.error("No URLs returned", res);
                alert("Failed to upload some images");
            }
        } catch (error) {
            console.error("Error uploading images:", error);
            alert("Error uploading images");
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = (index: number) => {
        const currentImages = form.getValues("images") || [];
        const newImages = currentImages.filter((_, i) => i !== index);
        form.setValue("images", newImages);
        // Update main image if needed
        if (newImages.length > 0) {
            form.setValue("imageUrl", newImages[0]);
        } else {
            form.setValue("imageUrl", "");
        }
    };

    const onSubmit = async (data: DestinationFormValues) => {
        setIsSaving(true);
        let result;

        // Ensure image array is set
        const finalData = {
            ...data,
            images: data.images || (data.imageUrl ? [data.imageUrl] : [])
        };

        if (initialData) {
            result = await updateDestination(initialData.id, finalData);
        } else {
            result = await createDestination(finalData);
        }

        setIsSaving(false);

        if (result.success) {
            router.push("/admin/gallery");
            router.refresh();
        } else {
            alert("Something went wrong");
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">{initialData ? "Edit Destination" : "Create Destination"}</h1>
                    <p className="text-slate-500 text-sm mt-1">Fill in the details below. Fields marked with * are required.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors font-medium border border-transparent hover:border-slate-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSaving || isUploading}
                        className="bg-slate-900 text-white px-6 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 flex items-center gap-2 font-medium"
                    >
                        {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isSaving ? "Saving..." : (initialData ? "Update Changes" : "Create Destination")}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Column: Main Info */}
                <div className="xl:col-span-2 space-y-6">
                    {/* Basic Details Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Basic Information</h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
                                <input
                                    {...form.register("title")}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition-all placeholder:text-slate-400 text-slate-900"
                                    placeholder="e.g. Ella Rock"
                                />
                                {form.formState.errors.title && (
                                    <p className="text-red-500 text-sm mt-1.5 font-medium">{form.formState.errors.title.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                                <textarea
                                    {...form.register("description")}
                                    rows={8}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition-all placeholder:text-slate-400 resize-y text-slate-900"
                                    placeholder="Describe the destination..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Gallery Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-900">Gallery Images</h3>
                            <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
                                {form.watch("images")?.length || 0} / 10
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {form.watch("images")?.map((url, index) => (
                                <div key={url + index} className="relative aspect-square rounded-xl overflow-hidden group border border-slate-200 shadow-sm">
                                    <Image src={url} alt={`Gallery ${index + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-red-50"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    {index === 0 && (
                                        <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] py-1 px-2 rounded-md text-center font-medium shadow-sm">
                                            Cover Image
                                        </div>
                                    )}
                                </div>
                            ))}

                            <label className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer group">
                                <div className="p-3 bg-slate-50 group-hover:bg-blue-100 rounded-full mb-2 transition-colors">
                                    <Plus className="w-6 h-6 text-slate-400 group-hover:text-blue-600" />
                                </div>
                                <span className="text-xs font-semibold text-slate-500 group-hover:text-blue-600">Upload Images</span>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    disabled={isUploading}
                                />
                            </label>
                        </div>
                        {isUploading && (
                            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-4 py-2 rounded-lg inline-block">
                                <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                                Uploading assets...
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Location Map */}
                <div className="xl:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Location</h3>
                        <p className="text-slate-500 text-sm mb-4">Click on the map to pin the exact location.</p>

                        <div className="rounded-xl overflow-hidden border border-slate-200 shadow-inner mb-4 relative z-0">
                            <LocationPicker
                                value={form.watch("locations")}
                                onChange={(val) => form.setValue("locations", val)}
                            />
                        </div>

                        {form.watch("locations") && form.watch("locations")?.length > 0 && (
                            <div className="grid grid-cols-2 gap-3">
                                {form.watch("locations")?.slice(0, 4).map((loc, i) => (
                                    <div key={i} className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-xs text-slate-600">
                                        Lat: {loc.lat.toFixed(4)}, Lng: {loc.lng.toFixed(4)}
                                    </div>
                                ))}
                                {form.watch("locations")!.length > 4 && (
                                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-xs text-slate-500 flex items-center justify-center">
                                        +{(form.watch("locations")?.length || 0) - 4} more
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}
