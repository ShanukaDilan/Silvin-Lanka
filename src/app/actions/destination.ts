"use server";

import prisma from "@/lib/prisma";
import { destinationSchema, DestinationFormValues } from "@/lib/validations/destination";
import { revalidatePath } from "next/cache";
import { unlink } from "fs/promises";
import path from "path";

export async function createDestination(data: DestinationFormValues) {
    const result = destinationSchema.safeParse(data);

    if (!result.success) {
        return { error: "Invalid data" };
    }

    try {
        const payload = {
            ...result.data,
            // Ensure compatibility: Set imageUrl to first image if available
            imageUrl: result.data.images && result.data.images.length > 0
                ? result.data.images[0]
                : (result.data.imageUrl || ""),
            locations: result.data.locations as any,
        };

        await prisma.destination.create({
            data: payload,
        });

        revalidatePath("/admin/gallery");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Create destination error:", error);
        return { error: "Failed to create destination" };
    }
}

export async function updateDestination(id: string, data: DestinationFormValues) {
    const result = destinationSchema.safeParse(data);

    if (!result.success) {
        return { error: "Invalid data" };
    }

    try {
        // Fetch existing data for cleanup
        const existingDest = await prisma.destination.findUnique({
            where: { id },
            select: { images: true }
        });

        if (existingDest && Array.isArray(existingDest.images)) {
            const oldImages = existingDest.images as string[];
            const newImages = result.data.images || [];

            const imagesToDelete = oldImages.filter(img => !newImages.includes(img));

            for (const img of imagesToDelete) {
                if (img && img.startsWith('/uploads/')) {
                    try {
                        const filePath = path.join(process.cwd(), 'public', img);
                        await unlink(filePath);
                    } catch (error) {
                        console.error(`Failed to delete old destination image: ${img}`, error);
                    }
                }
            }
        }

        const payload = {
            ...result.data,
            imageUrl: result.data.images && result.data.images.length > 0
                ? result.data.images[0]
                : (result.data.imageUrl || ""),
            locations: result.data.locations as any,
        };

        await prisma.destination.update({
            where: { id },
            data: payload,
        });

        revalidatePath("/admin/gallery");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Update destination error:", error);
        return { error: "Failed to update destination" };
    }
}

export async function deleteDestination(id: string) {
    try {
        // Fetch before delete
        const dest = await prisma.destination.findUnique({ where: { id } });

        if (dest && Array.isArray(dest.images)) {
            const images = dest.images as string[];
            for (const img of images) {
                if (img && img.startsWith('/uploads/')) {
                    try {
                        const filePath = path.join(process.cwd(), 'public', img);
                        await unlink(filePath);
                    } catch (error) {
                        console.error(`Failed to delete destination image: ${img}`, error);
                    }
                }
            }
        }

        await prisma.destination.delete({ where: { id } });
        revalidatePath("/admin/gallery");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Delete destination error:", error);
        return { error: "Failed to delete destination" };
    }
}

export async function getDestinations() {
    try {
        if (process.env.DATABASE_URL?.includes("dummy")) return [];
        return await prisma.destination.findMany({
            orderBy: { createdAt: "desc" },
        });
    } catch {
        return [];
    }
}

export async function getDestination(id: string) {
    try {
        const destination = await prisma.destination.findUnique({
            where: { id },
        });
        return destination;
    } catch (error) {
        console.error("Error fetching destination:", error);
        return null;
    }
}
