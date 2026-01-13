"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { siteProfileSchema, SiteProfileFormValues } from "@/lib/validations/profile";
import { updateSiteProfile } from "@/app/actions/profile";
import { uploadImageAction } from "@/app/actions/upload";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { RichTextEditor } from "@/components/ui/RichTextEditor";

interface SiteProfileFormProps {
    initialData?: SiteProfileFormValues & { id?: string };
}

export function SiteProfileForm({ initialData }: SiteProfileFormProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const form = useForm({
        resolver: zodResolver(siteProfileSchema),
        defaultValues: {
            aboutText: initialData?.aboutText || "",
            email: initialData?.email || "",
            phone: initialData?.phone || "",
            address: initialData?.address || "",
            facebookUrl: initialData?.facebookUrl || "",
            instagramUrl: initialData?.instagramUrl || "",
            aboutImage: initialData?.aboutImage || undefined,
            toursHeroImage: initialData?.toursHeroImage || undefined,
            toursHeroColor: initialData?.toursHeroColor || undefined,
            galleryHeroImage: initialData?.galleryHeroImage || undefined,
            galleryHeroColor: initialData?.galleryHeroColor || undefined,
            aboutHeroImage: initialData?.aboutHeroImage || undefined,
            aboutHeroColor: initialData?.aboutHeroColor || undefined,
            contactHeroImage: initialData?.contactHeroImage || undefined,
            contactHeroColor: initialData?.contactHeroColor || undefined,
            reviewsHeroImage: initialData?.reviewsHeroImage || undefined,
            reviewsHeroColor: initialData?.reviewsHeroColor || undefined,
            navColor: initialData?.navColor || "#ffffff",
            siteTitle: initialData?.siteTitle || "",
            siteDescription: initialData?.siteDescription || "",
            keywords: initialData?.keywords || "",
        },
    });


    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        const res = await uploadImageAction(formData);
        if (res.url) {
            form.setValue("aboutImage", res.url);
        }
        setIsUploading(false);
    };

    const onSubmit = async (data: SiteProfileFormValues) => {
        setIsSaving(true);
        try {
            const res = await updateSiteProfile(data);
            if (res && 'error' in res) {
                alert("Error: " + res.error);
            } else {
                alert("Profile updated successfully!");
            }
        } catch (error) {
            console.error(error);
            alert("An unexpected error occurred. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={form.handleSubmit(
            (data) => {
                onSubmit(data);
            },
            (errors) => {
                console.error("Form validation errors:", errors);
            }
        )} className="space-y-6 max-w-5xl bg-white p-6 rounded-2xl shadow-sm">
            {Object.keys(form.formState.errors).length > 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h3 className="text-red-800 font-semibold mb-2">Please fix the following errors:</h3>
                    <ul className="list-disc list-inside text-red-700 text-sm">
                        {Object.entries(form.formState.errors).map(([key, error]) => (
                            <li key={key}>{key}: {error?.message as string}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800">General Information</h2>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Navbar Color</label>
                    <div className="flex items-center gap-3">
                        <input
                            id="navColor"
                            type="color"
                            {...form.register("navColor")}
                            className="h-10 w-20 p-1 rounded border border-slate-300 cursor-pointer"
                        />
                        <span className="text-sm text-slate-600">Primary overlay color (Glass effect will be applied automatically)</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">About Us Image</label>
                    <div className="flex items-center gap-4">
                        {form.watch("aboutImage") && (
                            <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-slate-200">
                                <Image
                                    src={form.watch("aboutImage")!}
                                    alt="About"
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=About';
                                    }}
                                />
                            </div>
                        )}
                        <div className="flex-1">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={isUploading}
                                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                            />
                            {isUploading && <p className="text-xs text-blue-500 mt-1">Uploading...</p>}
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tours Page Hero Image</label>
                    <p className="text-xs text-slate-500 mb-2">This image will be used as the background header for the public Tours listing page.</p>
                    <div className="flex items-center gap-4">
                        {form.watch("toursHeroImage") && (
                            <div className="relative w-48 h-24 rounded-lg overflow-hidden border border-slate-200">
                                <Image
                                    src={form.watch("toursHeroImage")!}
                                    alt="Tours Hero"
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Hero+Image';
                                    }}
                                />
                            </div>
                        )}
                        <div className="flex-1 space-y-3">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    setIsUploading(true);
                                    const formData = new FormData();
                                    formData.append("file", file);

                                    const res = await uploadImageAction(formData);
                                    if (res.url) {
                                        form.setValue("toursHeroImage", res.url);
                                    }
                                    setIsUploading(false);
                                }}
                                disabled={isUploading}
                                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                            />

                            <div className="flex items-center gap-3">
                                <input
                                    id="toursHeroColor"
                                    type="color"
                                    {...form.register("toursHeroColor")}
                                    className="h-10 w-20 p-1 rounded border border-slate-300 cursor-pointer"
                                />
                                <span className="text-sm text-slate-600">Primary Background Color</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Gallery Page Hero Image</label>
                    <p className="text-xs text-slate-500 mb-2">This image will be used as the background header for the public Gallery listing page.</p>
                    <div className="flex items-center gap-4">
                        {form.watch("galleryHeroImage") && (
                            <div className="relative w-48 h-24 rounded-lg overflow-hidden border border-slate-200">
                                <Image
                                    src={form.watch("galleryHeroImage")!}
                                    alt="Gallery Hero"
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Hero+Image';
                                    }}
                                />
                            </div>
                        )}
                        <div className="flex-1 space-y-3">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    setIsUploading(true);
                                    const formData = new FormData();
                                    formData.append("file", file);

                                    const res = await uploadImageAction(formData);
                                    if (res.url) {
                                        form.setValue("galleryHeroImage", res.url);
                                    }
                                    setIsUploading(false);
                                }}
                                disabled={isUploading}
                                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                            />
                            <div className="flex items-center gap-3">
                                <input
                                    id="galleryHeroColor"
                                    type="color"
                                    {...form.register("galleryHeroColor")}
                                    className="h-10 w-20 p-1 rounded border border-slate-100 cursor-pointer"
                                />
                                <span className="text-sm text-slate-600">Primary Background Color</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">About Page Hero Image</label>
                    <p className="text-xs text-slate-500 mb-2">This image will be used as the background header for the public About page.</p>
                    <div className="flex items-center gap-4">
                        {form.watch("aboutHeroImage") && (
                            <div className="relative w-48 h-24 rounded-lg overflow-hidden border border-slate-200">
                                <Image
                                    src={form.watch("aboutHeroImage")!}
                                    alt="About Hero"
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Hero+Image';
                                    }}
                                />
                            </div>
                        )}
                        <div className="flex-1 space-y-3">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    setIsUploading(true);
                                    const formData = new FormData();
                                    formData.append("file", file);

                                    const res = await uploadImageAction(formData);
                                    if (res.url) {
                                        form.setValue("aboutHeroImage", res.url);
                                    }
                                    setIsUploading(false);
                                }}
                                disabled={isUploading}
                                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                            />
                            <div className="flex items-center gap-3">
                                <input
                                    id="aboutHeroColor"
                                    type="color"
                                    {...form.register("aboutHeroColor")}
                                    className="h-10 w-20 p-1 rounded border border-slate-300 cursor-pointer"
                                />
                                <span className="text-sm text-slate-600">Primary Background Color</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Contact Page Hero Image</label>
                    <p className="text-xs text-slate-500 mb-2">This image will be used as the background header for the public Contact page.</p>
                    <div className="flex items-center gap-4">
                        {form.watch("contactHeroImage") && (
                            <div className="relative w-48 h-24 rounded-lg overflow-hidden border border-slate-200">
                                <Image
                                    src={form.watch("contactHeroImage")!}
                                    alt="Contact Hero"
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Hero+Image';
                                    }}
                                />
                            </div>
                        )}
                        <div className="flex-1 space-y-3">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    setIsUploading(true);
                                    const formData = new FormData();
                                    formData.append("file", file);

                                    const res = await uploadImageAction(formData);
                                    if (res.url) {
                                        form.setValue("contactHeroImage", res.url);
                                    }
                                    setIsUploading(false);
                                }}
                                disabled={isUploading}
                                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                            />
                            <div className="flex items-center gap-3">
                                <input
                                    id="contactHeroColor"
                                    type="color"
                                    {...form.register("contactHeroColor")}
                                    className="h-10 w-20 p-1 rounded border border-slate-300 cursor-pointer"
                                />
                                <span className="text-sm text-slate-600">Primary Background Color</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Reviews Page Hero Image</label>
                    <p className="text-xs text-slate-500 mb-2">This image will be used as the background header for the public Reviews page.</p>
                    <div className="flex items-center gap-4">
                        {form.watch("reviewsHeroImage") && (
                            <div className="relative w-48 h-24 rounded-lg overflow-hidden border border-slate-200">
                                <Image
                                    src={form.watch("reviewsHeroImage")!}
                                    alt="Reviews Hero"
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Hero+Image';
                                    }}
                                />
                            </div>
                        )}
                        <div className="flex-1 space-y-3">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    setIsUploading(true);
                                    const formData = new FormData();
                                    formData.append("file", file);

                                    const res = await uploadImageAction(formData);
                                    if (res.url) {
                                        form.setValue("reviewsHeroImage", res.url);
                                    }
                                    setIsUploading(false);
                                }}
                                disabled={isUploading}
                                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                            />
                            <div className="flex items-center gap-3">
                                <input
                                    id="reviewsHeroColor"
                                    type="color"
                                    {...form.register("reviewsHeroColor")}
                                    className="h-10 w-20 p-1 rounded border border-slate-300 cursor-pointer"
                                />
                                <span className="text-sm text-slate-600">Primary Background Color</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">About Text</label>
                    <Controller
                        name="aboutText"
                        control={form.control}
                        render={({ field }) => (
                            <RichTextEditor
                                value={field.value || ""}
                                onChange={field.onChange}
                                placeholder="Tell us about your company..."
                            />
                        )}
                    />
                    {form.formState.errors.aboutText && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.aboutText.message}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                        id="email"
                        {...form.register("email")}
                        type="email"
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                    />
                    {form.formState.errors.email && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                    <input
                        id="phone"
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                        {...form.register("phone")}
                    />
                    {form.formState.errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                <input
                    {...form.register("address")}
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 pt-4">Social Media</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Facebook URL</label>
                        <input
                            {...form.register("facebookUrl")}
                            type="url"
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                            placeholder="https://facebook.com/..."
                        />
                        {form.formState.errors.facebookUrl && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.facebookUrl.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Instagram URL</label>
                        <input
                            {...form.register("instagramUrl")}
                            type="url"
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                            placeholder="https://instagram.com/..."
                        />
                        {form.formState.errors.instagramUrl && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.instagramUrl.message}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
                <h2 className="text-xl font-semibold text-slate-800">SEO Management</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Site Title</label>
                        <input
                            {...form.register("siteTitle")}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                            placeholder="Silvin Lanka - Explore Sri Lanka"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Meta Description</label>
                        <textarea
                            {...form.register("siteDescription")}
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                            placeholder="A brief description for search engines..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Keywords</label>
                        <input
                            {...form.register("keywords")}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                            placeholder="travel, tours, sri lanka, guide..."
                        />
                        <p className="text-xs text-slate-500 mt-1">Separate keywords with commas.</p>
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={isSaving || isUploading}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isSaving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form >
    );
}
