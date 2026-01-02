import { z } from "zod";

export const destinationSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().optional(),
    imageUrl: z.string().optional(), // Deprecated but kept for type safety if needed temporarily
    images: z.array(z.string()).optional(),
    latitude: z.coerce.number().optional(),
    longitude: z.coerce.number().optional(),
    locations: z.array(z.object({
        lat: z.number(),
        lng: z.number(),
        name: z.string().optional()
    })).optional().default([]),
});

export type DestinationFormValues = z.infer<typeof destinationSchema>;
