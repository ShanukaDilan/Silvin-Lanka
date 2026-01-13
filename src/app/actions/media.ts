"use server";

import fs from "fs/promises";
import path from "path";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

export type MediaFile = {
    name: string;
    url: string;
    size: number; // in bytes
    createdAt: Date;
    isActive: boolean;
};

export async function getMediaFiles(): Promise<MediaFile[]> {
    // 1. Ensure directory exists
    try {
        await fs.access(UPLOADS_DIR);
    } catch {
        return [];
    }

    // 2. Read all files in uploads
    const files = await fs.readdir(UPLOADS_DIR);

    // 3. Get generic file info
    const fileStatsPromises = files.map(async (file) => {
        const filePath = path.join(UPLOADS_DIR, file);
        try {
            const stats = await fs.stat(filePath);
            return {
                name: file,
                url: `/uploads/${file}`,
                size: stats.size,
                createdAt: stats.birthtime,
            };
        } catch (e) {
            return null;
        }
    });

    const fileInfos = (await Promise.all(fileStatsPromises)).filter(
        (f): f is NonNullable<typeof f> => f !== null
    );

    // 4. Collect all used image paths from DB
    const usedImages = new Set<string>();

    // Helper to extract filename from URL
    const addFromUrl = (url: string | null | undefined) => {
        if (!url) return;
        // Assume url is like "/uploads/filename.jpg"
        if (url.startsWith("/uploads/")) {
            const filename = url.replace("/uploads/", "");
            usedImages.add(filename);
        }
    };

    // Helper to parse JSON (expecting array of strings or objects depending on schema)
    const addFromJson = (json: any) => {
        if (!json) return;
        if (Array.isArray(json)) {
            json.forEach((item: any) => {
                if (typeof item === 'string') addFromUrl(item);
                // If your JSON structure is complex (e.g. objects with url property), adapt here. 
                // Based on schema, images seem to be stored as just URLs or simple structures.
                // We'll optimistically check string values.
            });
        }
    };

    // --- Query DB ---

    // SiteProfile
    const siteProfile = await prisma.siteProfile.findFirst();
    if (siteProfile) {
        addFromUrl(siteProfile.aboutImage);
        addFromUrl(siteProfile.toursHeroImage);
        addFromUrl(siteProfile.galleryHeroImage);
        addFromUrl(siteProfile.aboutHeroImage);
        addFromUrl(siteProfile.contactHeroImage);
        addFromUrl(siteProfile.reviewsHeroImage);
    }

    // Tours
    const tours = await prisma.tour.findMany({ select: { images: true } });
    tours.forEach(t => addFromJson(t.images));

    // Destinations
    const destinations = await prisma.destination.findMany({ select: { imageUrl: true, images: true } });
    destinations.forEach(d => {
        addFromUrl(d.imageUrl);
        addFromJson(d.images);
    });

    // HomePage
    const homePage = await prisma.homePage.findFirst();
    if (homePage) {
        addFromUrl(homePage.heroImage);
        // Parse JSON fields if they contain image refs
        // checking known JSON structures or just generic scan if needed
        // popularDestinations usually has images inside
        if (Array.isArray(homePage.popularDestinations)) {
            (homePage.popularDestinations as any[]).forEach((d: any) => addFromUrl(d.image));
        }
        // testimonials might have user images? 
        if (Array.isArray(homePage.testimonials)) {
            (homePage.testimonials as any[]).forEach((t: any) => addFromUrl(t.image));
        }
    }

    // 5. Mark active status
    // Sort by newest first
    return fileInfos
        .map((file) => ({
            ...file,
            isActive: usedImages.has(file.name),
        }))
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function deleteMediaFile(filename: string) {
    try {
        const filePath = path.join(UPLOADS_DIR, filename);
        await fs.unlink(filePath);
        revalidatePath("/admin/media");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete file:", error);
        return { success: false, error: "Failed to delete file" };
    }
}
