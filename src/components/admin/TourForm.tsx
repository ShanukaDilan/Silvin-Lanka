"use client";

import { LocationPicker } from "./LocationPicker";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tourSchema, TourFormValues } from "@/lib/validations/tour";
import { createTour, updateTour } from "@/app/actions/tour";
import { uploadImagesAction } from "@/app/actions/upload";
import { useState } from "react";
import Image from "next/image";
import { Loader2, X, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface TourFormProps {
    initialData?: TourFormValues & { id: string };
}

export function TourForm({ initialData }: TourFormProps) {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const form = useForm<TourFormValues>({
        resolver: zodResolver(tourSchema) as any,
        defaultValues: initialData || {
            title: "",
            description: "",
            price: 0,
            duration: "",
            location: "",
            images: [],
            locations: [],
            isFeatured: false,
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
                form.setValue("images", [...newImages, ...res.urls]);
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
        const currentImages = form.getValues("images");
        const newImages = currentImages.filter((_, i) => i !== index);
        form.setValue("images", newImages);
    };

    const onSubmit = async (data: TourFormValues) => {
        setIsSaving(true);
        let result;
        if (initialData) {
            result = await updateTour(initialData.id, data);
        } else {
            result = await createTour(data);
        }

        setIsSaving(false);

        if (result.success) {
            router.push("/admin/tours");
            router.refresh();
        } else {
            alert("Something went wrong");
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-4xl bg-white p-4 rounded-2xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                    <input
                        {...form.register("title")}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                        placeholder="e.g. 5 Days in Paradise"
                    />
                    {form.formState.errors.title && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.title.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Price (USD)</label>
                    <input
                        {...form.register("price")}
                        type="number"
                        step="0.01"
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                    />
                    {form.formState.errors.price && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.price.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
                    <input
                        {...form.register("duration")}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                        placeholder="e.g. 3 Days / 2 Nights"
                    />
                    {form.formState.errors.duration && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.duration.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                    <input
                        {...form.register("location")}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                        placeholder="e.g. Kandy, Sigiriya"
                    />
                    {form.formState.errors.location && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.location.message}</p>
                    )}
                </div>

                <div className="col-span-2">
                    <LocationPicker
                        value={form.watch("locations")}
                        onChange={(val) => form.setValue("locations", val)}
                    />
                </div>

                <div className="flex items-center gap-2 pt-2">
                    <input
                        type="checkbox"
                        {...form.register("isFeatured")}
                        id="isFeatured"
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="isFeatured" className="text-sm font-medium text-slate-700">Mark as Featured Tour</label>
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea
                        {...form.register("description")}
                        rows={5}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                    />
                    {form.formState.errors.description && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.description.message}</p>
                    )}
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Gallery Images</label>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {form.watch("images")?.map((url, index) => (
                            <div key={url} className="relative aspect-square rounded-lg overflow-hidden group">
                                <Image src={url} alt={`Tour image ${index + 1}`} fill className="object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 p-1 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}

                        <label className="flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer">
                            <Plus className="w-8 h-8 text-slate-400" />
                            <span className="text-xs text-slate-500 mt-2">Add Images</span>
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
                    {isUploading && <p className="text-sm text-blue-500">Uploading images...</p>}
                    {form.formState.errors.images && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.images.message}</p>
                    )}
                </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSaving || isUploading}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isSaving ? "Saving..." : (initialData ? "Update Tour" : "Create Tour")}
                </button>
            </div>
        </form>
    );
}
