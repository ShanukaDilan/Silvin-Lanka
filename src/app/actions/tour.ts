"use server";

import prisma from "@/lib/prisma";
import { tourSchema, TourFormValues } from "@/lib/validations/tour";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { unlink } from "fs/promises";
import path from "path";

export async function createTour(data: TourFormValues) {
    const result = tourSchema.safeParse(data);

    if (!result.success) {
        return { error: "Invalid data" };
    }

    try {
        await prisma.tour.create({
            data: {
                ...result.data,
                images: result.data.images as any, // Prisma Json handling
                locations: result.data.locations as any,
            },
        });

        revalidatePath("/admin/tours");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Create tour error:", error);
        return { error: "Failed to create tour" };
    }
}

export async function updateTour(id: string, data: TourFormValues) {
    const result = tourSchema.safeParse(data);

    if (!result.success) {
        return { error: "Invalid data" };
    }

    try {
        // Fetch existing keys to identify removed images
        const existingTour = await prisma.tour.findUnique({
            where: { id },
            select: { images: true }
        });

        if (existingTour && Array.isArray(existingTour.images)) {
            const oldImages = existingTour.images as string[];
            const newImages = result.data.images || [];

            // Find images that are in old list but NOT in new list
            const imagesToDelete = oldImages.filter(img => !newImages.includes(img));

            for (const img of imagesToDelete) {
                if (img && img.startsWith('/uploads/')) {
                    try {
                        const filePath = path.join(process.cwd(), 'public', img);
                        await unlink(filePath);
                    } catch (error) {
                        console.error(`Failed to delete old tour image: ${img}`, error);
                    }
                }
            }
        }

        await prisma.tour.update({
            where: { id },
            data: {
                ...result.data,
                images: result.data.images as any,
                locations: result.data.locations as any,
            },
        });

        revalidatePath("/admin/tours");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Update tour error:", error);
        return { error: "Failed to update tour" };
    }
}

export async function deleteTour(id: string) {
    try {
        // Get tour details before deletion to clean up images
        const tour = await prisma.tour.findUnique({ where: { id } });

        if (tour && Array.isArray(tour.images)) {
            const images = tour.images as string[];
            for (const img of images) {
                if (img && img.startsWith('/uploads/')) {
                    try {
                        const filePath = path.join(process.cwd(), 'public', img);
                        await unlink(filePath);
                    } catch (error) {
                        console.error(`Failed to delete tour image: ${img}`, error);
                    }
                }
            }
        }

        await prisma.tour.delete({ where: { id } });
        revalidatePath("/admin/tours");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Delete tour error:", error);
        return { error: "Failed to delete tour" };
    }
}

export async function getTour(id: string) {
    try {
        if (process.env.DATABASE_URL?.includes("dummy")) throw new Error("Build dummy");
        return await prisma.tour.findUnique({
            where: { id }
        });
    } catch (error) {
        console.error("Error fetching tour:", error);
        return null;
    }
}

export async function getTours() {
    try {
        if (process.env.DATABASE_URL?.includes("dummy")) return [];
        return await prisma.tour.findMany({
            orderBy: { createdAt: 'desc' }
        });
    } catch {
        return [];
    }
}

export async function getFeaturedTours() {
    try {
        if (process.env.DATABASE_URL?.includes("dummy")) return [];
        return await prisma.tour.findMany({
            where: { isFeatured: true },
            take: 3,
            orderBy: { createdAt: 'desc' }
        });
    } catch {
        return [];
    }
}
