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

// Return type includes debug info
export type MediaResponse = {
    files: MediaFile[];
    debugPath: string;
    error?: string;
};

export async function getMediaFiles(): Promise<MediaResponse> {
    const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

    // 1. Ensure directory exists
    try {
        await fs.access(UPLOADS_DIR);
    } catch (e) {
        return { files: [], debugPath: UPLOADS_DIR, error: "Directory not found or inaccessible" };
    }

    // 2. Read all files in uploads
    let files: string[] = [];
    try {
        files = await fs.readdir(UPLOADS_DIR);
    } catch (e: any) {
        return { files: [], debugPath: UPLOADS_DIR, error: `readdir failed: ${e.message}` };
    }

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
            } as MediaFile;
        } catch (e) {
            return null;
        }
    });

    const fileInfos = (await Promise.all(fileStatsPromises)).filter(
        (f): f is MediaFile => f !== null
    );

    // 4. Collect all used image paths from DB
    const usedImages = new Set<string>();

    // Helper to extract filename from URL
    const addFromUrl = (url: string | null | undefined) => {
        if (!url) return;
        if (url.startsWith("/uploads/")) {
            const filename = url.replace("/uploads/", "");
            usedImages.add(filename);
        }
    };

    // Helper to parse JSON
    const addFromJson = (json: any) => {
        if (!json) return;
        if (Array.isArray(json)) {
            json.forEach((item: any) => {
                if (typeof item === 'string') addFromUrl(item);
                else if (item?.image) addFromUrl(item.image); // Handle object structure with image property
            });
        }
    };

    // --- Query DB ---
    try {
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
            if (Array.isArray(homePage.popularDestinations)) {
                (homePage.popularDestinations as any[]).forEach((d: any) => addFromUrl(d.image));
            }
            if (Array.isArray(homePage.testimonials)) {
                (homePage.testimonials as any[]).forEach((t: any) => addFromUrl(t.avatar)); // fixed to check avatar
            }
        }
    } catch (e) {
        console.error("Error querying DB for media usage:", e);
        // Continue even if DB query fails, just mark all as unused or whatever logic you prefer. 
        // For now, usedImages will be empty.
    }

    // 5. Mark active status
    const sortedFiles = fileInfos
        .map((file) => ({
            ...file,
            isActive: usedImages.has(file.name),
        }))
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return {
        files: sortedFiles,
        debugPath: UPLOADS_DIR
    };
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
