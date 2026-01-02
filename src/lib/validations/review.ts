import { z } from "zod";

export const reviewSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    rating: z.coerce.number().min(1).max(5),
    comment: z.string().min(10, "Comment must be at least 10 characters"),
    facebookUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
    instagramUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
    tiktokUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
