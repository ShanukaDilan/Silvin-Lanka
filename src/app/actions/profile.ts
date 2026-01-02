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
            aboutText: 'Dummy About',
            aboutImage: '',
            email: 'dummy@example.com',
            phone: '000',
            address: 'Dummy Address',
            facebookUrl: '',
            instagramUrl: '',
            tiktokUrl: '',
            siteTitle: 'Silvin Lanka',
            siteDescription: 'Explore Sri Lanka',
            keywords: 'travel, sri lanka',
            createdAt: new Date(),
            updatedAt: new Date()
        } as any;
    }
}

export async function updateSiteProfile(data: SiteProfileFormValues) {
    const result = siteProfileSchema.safeParse(data);

    if (!result.success) {
        return { error: "Invalid data" };
    }

    try {
        const existingProfile = await prisma.siteProfile.findFirst();

        if (existingProfile) {
            // Delete old images if they are being replaced
            const imageFields = ['aboutImage', 'toursHeroImage', 'galleryHeroImage', 'aboutHeroImage'] as const;

            for (const field of imageFields) {
                const oldImage = existingProfile[field];
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
        revalidatePath("/"); // Revalidate home page as it might use contact info
        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: "Failed to update profile" };
    }
}
