"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getHomePage() {
    try {
        const homePage = await prisma.homePage.findFirst();
        return { success: true, data: homePage };
    } catch (error) {
        console.error("Error fetching home page:", error);
        return { success: false, error: "Failed to fetch home page data" };
    }
}

export async function updateHomePage(data: any) {
    console.log("updateHomePage received:", JSON.stringify(data, null, 2)); // DEBUG LOG
    try {
        const homePage = await prisma.homePage.findFirst();

        if (!homePage) {
            return { success: false, error: "Home page record not found" };
        }

        const updated = await prisma.homePage.update({
            where: { id: homePage.id },
            data: {
                heroTitle: data.heroTitle,
                heroSubtitle: data.heroSubtitle,
                heroDescription: data.heroDescription,
                heroImage: data.heroImage,
                whyChooseUsTitle: data.whyChooseUsTitle,
                whyChooseUsFeatures: data.whyChooseUsFeatures,
                newsletterTitle: data.newsletterTitle,
                newsletterDescription: data.newsletterDescription,
                destinationsTitle: data.destinationsTitle,
                destinationsSubtitle: data.destinationsSubtitle,
                popularDestinations: data.popularDestinations,
                featuredToursTitle: data.featuredToursTitle,
                featuredToursSubtitle: data.featuredToursSubtitle,
                testimonialsTitle: data.testimonialsTitle,
                testimonialsSubtitle: data.testimonialsSubtitle,
                testimonials: data.testimonials,
            } as any,
        });

        revalidatePath("/");
        revalidatePath("/admin/media");
        return { success: true, data: updated };
    } catch (error) {
        console.error("Error updating home page:", error);
        return { success: false, error: "Failed to update home page data" };
    }
}
