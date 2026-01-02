"use server";

import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function trackVisit(pathname: string) {
    try {
        const headersList = await headers();
        const userAgent = headersList.get("user-agent") || "unknown";
        // In a real app, we might hash the IP here for unique visitor counting
        // For privacy/simplicity, we'll just log the UA and Path

        await prisma.visit.create({
            data: {
                page: pathname,
                userAgent: userAgent.substring(0, 190), // Truncate to fit if needed
            }
        });
    } catch (error) {
        // Fail silently for analytics to not block main thread
        console.error("Analytics error:", error);
    }
}
