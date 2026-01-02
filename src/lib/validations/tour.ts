import { z } from "zod";

export const tourSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(20, "Description must be at least 20 characters"),
    price: z.coerce.number().min(0, "Price must be a positive number"),
    duration: z.string().min(2, "Duration is required"),
    location: z.string().min(2, "Location is required"),
    images: z.array(z.string()).min(1, "At least one image is required"),
    locations: z.array(z.object({
        lat: z.number(),
        lng: z.number(),
        name: z.string().optional()
    })).optional().default([]),
    isFeatured: z.boolean().default(false),
});

export type TourFormValues = z.infer<typeof tourSchema>;
