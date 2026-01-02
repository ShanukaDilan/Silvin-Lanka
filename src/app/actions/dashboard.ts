"use server";

import prisma from "@/lib/prisma";

export async function getDashboardStats() {
    try {
        const tourCount = await prisma.tour.count();
        const reviewCount = await prisma.review.count();
        const galleryCount = await prisma.destination.count();
        const visitCount = await prisma.visit.count();

        // Calculate trends (mock logic for now, or simple date comparison)
        // For simplicity in this iteration, we'll return raw counts and static mock trends
        // Real trend calculation requires comparing count where createdAt > 30 days ago vs prior

        return {
            tours: tourCount,
            reviews: reviewCount,
            gallery: galleryCount,
            visitors: visitCount
        };
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return { tours: 0, reviews: 0, gallery: 0, visitors: 0 };
    }
}

export async function getRecentActivity() {
    try {
        const recentTours = await prisma.tour.findMany({
            take: 3,
            orderBy: { createdAt: "desc" },
            select: { id: true, title: true, createdAt: true }
        });

        const recentReviews = await prisma.review.findMany({
            take: 3,
            orderBy: { createdAt: "desc" },
            select: { id: true, name: true, createdAt: true }
        });

        // Combine and sort
        const activity = [
            ...recentTours.map(t => ({
                type: "Tour Package",
                message: `Created "${t.title}"`,
                time: t.createdAt,
                id: t.id
            })),
            ...recentReviews.map(r => ({
                type: "Review",
                message: `New review from ${r.name}`,
                time: r.createdAt,
                id: r.id
            }))
        ].sort((a, b) => b.time.getTime() - a.time.getTime()).slice(0, 5);

        return activity;
    } catch (error) {
        console.error("Error fetching recent activity:", error);
        return [];
    }
}
