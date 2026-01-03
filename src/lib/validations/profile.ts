import { z } from "zod";

export const siteProfileSchema = z.object({
    aboutText: z.string().min(10, "About text must be at least 10 characters"),
    aboutImage: z.string().optional(),
    toursHeroImage: z.string().optional(),
    toursHeroColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Invalid hex color").optional(),
    galleryHeroImage: z.string().optional(),
    galleryHeroColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Invalid hex color").optional(),
    aboutHeroImage: z.string().optional(),
    aboutHeroColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Invalid hex color").optional(),
    navColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Invalid hex color").default("#ffffff"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    address: z.string().optional(),
    facebookUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
    instagramUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
    siteTitle: z.string().optional(),
    siteDescription: z.string().optional(),
    keywords: z.string().optional(),
});

export type SiteProfileFormValues = z.infer<typeof siteProfileSchema>;
