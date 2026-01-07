"use server";

import prisma from "@/lib/prisma";
import { siteProfileSchema, SiteProfileFormValues } from "@/lib/validations/profile";
import { revalidatePath } from "next/cache";
import { unlink } from "fs/promises";
import path from "path";

export async function getSiteProfile() {
    try {
        if (process.env.DATABASE_URL?.includes("dummy")) throw new Error("Build dummy");
        return await prisma.siteProfile.findFirst();
    } catch (error) {
        console.log("Returning dummy profile due to error:", error);
        return {
            id: 'dummy',
            aboutText: 'Welcome to Silvin Lanka. We offer the best tours in Sri Lanka.',
            aboutImage: '',
            toursHeroImage: '',
            toursHeroColor: '#172554',
            galleryHeroImage: '',
            galleryHeroColor: '#042f2e',
            aboutHeroImage: '',
            aboutHeroColor: '#0f172a',
            contactHeroImage: '',
            contactHeroColor: '#0f172a',
            reviewsHeroImage: '',
            reviewsHeroColor: '#f59e0b',
            email: 'info@silvinlanka.com',
            phone: '+94 77 123 4567',
            address: '123, Main Street, Colombo, Sri Lanka',
            facebookUrl: '',
            instagramUrl: '',
            siteTitle: 'Silvin Lanka - Explore Sri Lanka',
            siteDescription: 'Discover the hidden gems of Sri Lanka with our expert guides.',
            keywords: 'travel, tours, sri lanka, guide',
            navColor: '#ffffff',
            createdAt: new Date(),
            updatedAt: new Date()
        } as any;
    }
}

export async function updateSiteProfile(data: SiteProfileFormValues) {
    const result = siteProfileSchema.safeParse(data);

    if (!result.success) {
        console.error("Validation failed:", result.error.format());
        return { error: "Validation failed: " + JSON.stringify(result.error.flatten().fieldErrors) };
    }

    try {
        console.log("Updating profile with data:", data);
        const existingProfile = await prisma.siteProfile.findFirst();
        console.log("Existing profile found:", !!existingProfile);

        if (existingProfile) {
            // Delete old images if they are being replaced
            const imageFields = ['aboutImage', 'toursHeroImage', 'galleryHeroImage', 'aboutHeroImage', 'contactHeroImage', 'reviewsHeroImage'] as const;

            for (const field of imageFields) {
                const oldImage = (existingProfile as any)[field];
                // @ts-ignore - indexing typed object with string variable
                const newImage = result.data[field];

                if (oldImage && oldImage !== newImage && oldImage.startsWith('/uploads/')) {
                    try {
                        const filePath = path.join(process.cwd(), 'public', oldImage);
                        await unlink(filePath);
                        // console.log(`Deleted old image: ${filePath}`);
                    } catch (error) {
                        console.error(`Failed to delete old image: ${oldImage}`, error);
                    }
                }
            }

            await prisma.siteProfile.update({
                where: { id: existingProfile.id },
                data: result.data,
            });
        } else {
            await prisma.siteProfile.create({
                data: result.data,
            });
        }

        revalidatePath("/admin/profile");
        revalidatePath("/");
        revalidatePath("/about");
        revalidatePath("/contact");
        revalidatePath("/gallery");
        revalidatePath("/reviews");
        revalidatePath("/tours");

        return { success: true };
    } catch (error: any) {
        console.error("Update profile error:", error);
        return { error: "Failed to update profile: " + (error.message || String(error)) };
    }
}
