"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";
import { getHomePage, updateHomePage } from "@/app/actions/home";
import { FormInput, FormTextarea, ModernButton, FormLabel } from "@/components/ui/FormElements";
import { ImageCropper } from "@/components/ui/ImageCropper";

// Schema Validation
const homePageSchema = z.object({
    heroTitle: z.string().min(1, "Title is required"),
    heroSubtitle: z.string().min(1, "Subtitle is required"),
    heroDescription: z.string().min(1, "Description is required"),
    heroImage: z.string().min(1, "Hero Image URL is required"),
    whyChooseUsTitle: z.string().min(1, "Section Title is required"),
    whyChooseUsFeatures: z.array(z.object({
        icon: z.string().min(1, "Icon name is required"),
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
    })),
    newsletterTitle: z.string().min(1, "Title is required"),
    newsletterDescription: z.string().min(1, "Description is required"),
    destinationsTitle: z.string().min(1, "Title is required"),
    destinationsSubtitle: z.string().min(1, "Subtitle is required"),
    popularDestinations: z.array(z.object({
        title: z.string().min(1, "Title is required"),
        image: z.string().min(1, "Image is required"),
        tag: z.string().optional().nullable(),
        size: z.enum(["large", "normal", "wide"]),
    })),
    featuredToursTitle: z.string().min(1, "Title is required"),
    featuredToursSubtitle: z.string().min(1, "Subtitle is required"),
    testimonialsTitle: z.string().min(1, "Title is required"),
    testimonialsSubtitle: z.string().min(1, "Subtitle is required"),
    testimonials: z.array(z.object({
        name: z.string().min(1, "Name is required"),
        role: z.string().min(1, "Role is required"),
        comment: z.string().min(1, "Comment is required"),
        avatar: z.string().min(1, "Avatar is required"),
    })),
});

type FormValues = z.infer<typeof homePageSchema>;

export default function HomePageAdmin() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(homePageSchema),
        defaultValues: {
            whyChooseUsFeatures: [],
            popularDestinations: [],
            testimonials: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "whyChooseUsFeatures",
    });

    const { fields: destFields, append: appendDest, remove: removeDest } = useFieldArray({
        control,
        name: "popularDestinations",
    });

    const { fields: testFields, append: appendTest, remove: removeTest } = useFieldArray({
        control,
        name: "testimonials",
    });

    useEffect(() => {
        async function loadData() {
            const res = await getHomePage();
            if (res.success && res.data) {
                const data = res.data as any; // Cast to any to handle potential stale Prisma types
                reset({
                    heroTitle: data.heroTitle,
                    heroSubtitle: data.heroSubtitle,
                    heroDescription: data.heroDescription,
                    heroImage: data.heroImage,
                    whyChooseUsTitle: data.whyChooseUsTitle,
                    whyChooseUsFeatures: data.whyChooseUsFeatures as any,
                    newsletterTitle: data.newsletterTitle,
                    newsletterDescription: data.newsletterDescription,
                    destinationsTitle: data.destinationsTitle,
                    destinationsSubtitle: data.destinationsSubtitle,
                    popularDestinations: data.popularDestinations as any,
                    featuredToursTitle: data.featuredToursTitle,
                    featuredToursSubtitle: data.featuredToursSubtitle,
                    testimonialsTitle: data.testimonialsTitle,
                    testimonialsSubtitle: data.testimonialsSubtitle,
                    testimonials: data.testimonials as any,
                });
            }
            setLoading(false);
        }
        loadData();
    }, [reset]);

    const onSubmit = async (data: FormValues) => {
        setSaving(true);
        try {
            const res = await updateHomePage(data);
            if (res.success) {
                alert("Home Page updated successfully!");
            } else {
                alert("Error updating Home Page");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-900">Customize Home Page</h1>
                <ModernButton onClick={handleSubmit(onSubmit, (errors) => console.log("Form Errors:", errors))} disabled={saving}>
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                </ModernButton>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Hero Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
                    <h2 className="text-xl font-semibold border-b pb-2">Hero Section</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="Title" {...register("heroTitle")} error={errors.heroTitle?.message} />
                        <FormInput label="Subtitle" {...register("heroSubtitle")} error={errors.heroSubtitle?.message} />
                        <div className="md:col-span-2">
                            <FormTextarea label="Description" {...register("heroDescription")} error={errors.heroDescription?.message} />
                        </div>
                        <div className="md:col-span-2">
                            <FormLabel>Background Image</FormLabel>
                            <Controller
                                control={control}
                                name="heroImage"
                                render={({ field }) => (
                                    <ImageCropper
                                        label="Upload Hero Image"
                                        value={field.value}
                                        onImageCropped={(url: string) => field.onChange(url)}
                                        aspect={16 / 9}
                                    />
                                )}
                            />
                            {errors.heroImage && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.heroImage.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h2 className="text-xl font-semibold">Why Choose Us</h2>
                        <button
                            type="button"
                            onClick={() => append({ icon: "Leaf", title: "", description: "" })}
                            className="text-sm text-blue-600 hover:text-blue-700 flex items-center font-medium"
                        >
                            <Plus className="w-4 h-4 mr-1" /> Add Feature
                        </button>
                    </div>

                    <FormInput label="Section Title" {...register("whyChooseUsTitle")} error={errors.whyChooseUsTitle?.message} />

                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <div key={field.id} className="p-4 bg-slate-50 rounded-lg relative group">
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <FormInput
                                        label="Icon Name (Leaf, ShieldCheck, Tag)"
                                        {...register(`whyChooseUsFeatures.${index}.icon`)}
                                        error={errors.whyChooseUsFeatures?.[index]?.icon?.message}
                                    />
                                    <div className="md:col-span-2">
                                        <FormInput
                                            label="Feature Title"
                                            {...register(`whyChooseUsFeatures.${index}.title`)}
                                            error={errors.whyChooseUsFeatures?.[index]?.title?.message}
                                        />
                                    </div>
                                    <div className="md:col-span-3">
                                        <FormTextarea
                                            label="Feature Description"
                                            {...register(`whyChooseUsFeatures.${index}.description`)}
                                            error={errors.whyChooseUsFeatures?.[index]?.description?.message}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
                    <h2 className="text-xl font-semibold border-b pb-2">Newsletter Section</h2>
                    <FormInput label="Section Title" {...register("newsletterTitle")} error={errors.newsletterTitle?.message} />
                    <FormTextarea label="Description" {...register("newsletterDescription")} error={errors.newsletterDescription?.message} />
                </div>

                {/* Popular Destinations */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h2 className="text-xl font-semibold">Popular Destinations</h2>
                        <button
                            type="button"
                            onClick={() => appendDest({ title: "", image: "", tag: "", size: "normal" })}
                            className="text-sm text-blue-600 hover:text-blue-700 flex items-center font-medium"
                        >
                            <Plus className="w-4 h-4 mr-1" /> Add Destination
                        </button>
                    </div>

                    <FormInput label="Section Title" {...register("destinationsTitle")} error={errors.destinationsTitle?.message} />
                    <FormInput label="Subtitle" {...register("destinationsSubtitle")} error={errors.destinationsSubtitle?.message} />

                    <div className="space-y-4 mt-6">
                        {destFields.map((field, index) => (
                            <div key={field.id} className="p-4 bg-slate-50 rounded-lg relative group border border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => removeDest(index)}
                                    className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <FormInput
                                            label="Destination Title"
                                            {...register(`popularDestinations.${index}.title`)}
                                            error={errors.popularDestinations?.[index]?.title?.message}
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormInput
                                                label="Tag (Optional)"
                                                placeholder="e.g. Cultural"
                                                {...register(`popularDestinations.${index}.tag`)}
                                                error={errors.popularDestinations?.[index]?.tag?.message}
                                            />
                                            <div className="w-full">
                                                <FormLabel>Card Size</FormLabel>
                                                <select
                                                    className="flex w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition-all duration-200 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10 hover:border-slate-300"
                                                    {...register(`popularDestinations.${index}.size`)}
                                                >
                                                    <option value="normal">Normal</option>
                                                    <option value="large">Large (2x2)</option>
                                                    <option value="wide">Wide (2x1)</option>
                                                </select>
                                                {errors.popularDestinations?.[index]?.size?.message && (
                                                    <p className="mt-1.5 text-xs font-medium text-red-500">{errors.popularDestinations[index]?.size?.message}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <FormLabel>Destination Image</FormLabel>
                                        <Controller
                                            control={control}
                                            name={`popularDestinations.${index}.image`}
                                            render={({ field }) => (
                                                <ImageCropper
                                                    label="Upload Image"
                                                    value={field.value}
                                                    onImageCropped={(url: string) => field.onChange(url)}
                                                    aspect={4 / 3} // Default aspect, maybe change based on size?
                                                />
                                            )}
                                        />
                                        {errors.popularDestinations?.[index]?.image?.message && (
                                            <p className="mt-1.5 text-xs font-medium text-red-500">{errors.popularDestinations[index]?.image?.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Featured Tours Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
                    <h2 className="text-xl font-semibold border-b pb-2">Featured Packages</h2>
                    <FormInput label="Section Title" {...register("featuredToursTitle")} error={errors.featuredToursTitle?.message} />
                    <FormInput label="Subtitle" {...register("featuredToursSubtitle")} error={errors.featuredToursSubtitle?.message} />
                </div>

                {/* Testimonials Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h2 className="text-xl font-semibold">Testimonials</h2>
                        <button
                            type="button"
                            onClick={() => appendTest({ name: "", role: "", comment: "", avatar: "" })}
                            className="text-sm text-blue-600 hover:text-blue-700 flex items-center font-medium"
                        >
                            <Plus className="w-4 h-4 mr-1" /> Add Testimonial
                        </button>
                    </div>

                    <FormInput label="Section Title" {...register("testimonialsTitle")} error={errors.testimonialsTitle?.message} />
                    <FormInput label="Subtitle" {...register("testimonialsSubtitle")} error={errors.testimonialsSubtitle?.message} />

                    <div className="space-y-4 mt-6">
                        {testFields.map((field, index) => (
                            <div key={field.id} className="p-4 bg-slate-50 rounded-lg relative group border border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => removeTest(index)}
                                    className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormInput
                                                label="Name"
                                                {...register(`testimonials.${index}.name`)}
                                                error={errors.testimonials?.[index]?.name?.message}
                                            />
                                            <FormInput
                                                label="Role"
                                                {...register(`testimonials.${index}.role`)}
                                                error={errors.testimonials?.[index]?.role?.message}
                                            />
                                        </div>
                                        <FormTextarea
                                            label="Comment"
                                            {...register(`testimonials.${index}.comment`)}
                                            error={errors.testimonials?.[index]?.comment?.message}
                                        />
                                    </div>
                                    <div>
                                        <FormLabel>Avatar Image</FormLabel>
                                        <Controller
                                            control={control}
                                            name={`testimonials.${index}.avatar`}
                                            render={({ field }) => (
                                                <ImageCropper
                                                    label="Upload Avatar"
                                                    value={field.value}
                                                    onImageCropped={(url: string) => field.onChange(url)}
                                                    aspect={1}
                                                    circularCrop // Optional prop if supported, or handled by style
                                                />
                                            )}
                                        />
                                        {errors.testimonials?.[index]?.avatar?.message && (
                                            <p className="mt-1.5 text-xs font-medium text-red-500">{errors.testimonials[index]?.avatar?.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Save Button Bottom */}
                <div className="flex justify-end pt-6 border-t border-slate-200">
                    <ModernButton onClick={handleSubmit(onSubmit, (errors) => console.log("Form Errors:", errors))} disabled={saving}>
                        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                        Save Changes
                    </ModernButton>
                </div>
            </form>
        </div>
    );
}
