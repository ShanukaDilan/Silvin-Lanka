"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { reviewSchema, ReviewFormValues } from "@/lib/validations/review";

export async function getReviews() {
    if (process.env.DATABASE_URL?.includes("dummy")) return [];
    return await prisma.review.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function getApprovedReviews() {
    if (process.env.DATABASE_URL?.includes("dummy")) return [];
    return await prisma.review.findMany({
        where: { isApproved: true },
        orderBy: { createdAt: "desc" },
    });
}

export async function approveReview(id: string) {
    try {
        await prisma.review.update({
            where: { id },
            data: { isApproved: true },
        });
        revalidatePath("/admin/reviews");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Approve review error:", error);
        return { error: "Failed to approve review" };
    }
}

export async function deleteReview(id: string) {
    try {
        await prisma.review.delete({
            where: { id },
        });
        revalidatePath("/admin/reviews");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Delete review error:", error);
        return { error: "Failed to delete review" };
    }
}

export async function createReview(data: ReviewFormValues) {
    const result = reviewSchema.safeParse(data);

    if (!result.success) {
        return { error: "Invalid data" };
    }

    try {
        await prisma.review.create({
            data: {
                ...result.data,
                isApproved: false, // Default to unapproved
            }
        });

        revalidatePath("/admin/reviews");
        return { success: true };
    } catch (error) {
        console.error("Create review error:", error);
        return { error: "Failed to submit review" };
    }
}
