"use server";

import prisma from "@/lib/prisma";
import { contactSubmissionSchema, ContactSubmissionFormValues } from "@/lib/validations/contact";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth-utils";

export async function createContactSubmission(data: ContactSubmissionFormValues) {
    const result = contactSubmissionSchema.safeParse(data);

    if (!result.success) {
        return { error: "Validation failed: " + JSON.stringify(result.error.flatten().fieldErrors) };
    }

    try {
        await prisma.contactSubmission.create({
            data: {
                name: result.data.name,
                email: result.data.email,
                phone: result.data.phone || null,
                message: result.data.message,
            },
        });

        return { success: true };
    } catch (error: any) {
        console.error("Create contact submission error:", error);
        return { error: "Failed to submit contact form: " + (error.message || String(error)) };
    }
}

export async function getContactSubmissions(page: number = 1, limit: number = 20) {
    await requireAuth();

    try {
        const skip = (page - 1) * limit;

        const [submissions, total] = await Promise.all([
            prisma.contactSubmission.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.contactSubmission.count(),
        ]);

        return {
            submissions,
            total,
            pages: Math.ceil(total / limit),
            currentPage: page,
        };
    } catch (error: any) {
        console.error("Get contact submissions error:", error);
        return { error: "Failed to fetch contact submissions: " + (error.message || String(error)) };
    }
}

export async function getContactSubmission(id: string) {
    await requireAuth();

    try {
        const submission = await prisma.contactSubmission.findUnique({
            where: { id },
        });

        if (!submission) {
            return { error: "Contact submission not found" };
        }

        return { submission };
    } catch (error: any) {
        console.error("Get contact submission error:", error);
        return { error: "Failed to fetch contact submission: " + (error.message || String(error)) };
    }
}

export async function updateContactSubmissionStatus(id: string, status: "NEW" | "READ" | "ARCHIVED") {
    await requireAuth();

    try {
        await prisma.contactSubmission.update({
            where: { id },
            data: { status },
        });

        revalidatePath("/admin/contacts");
        return { success: true };
    } catch (error: any) {
        console.error("Update contact submission status error:", error);
        return { error: "Failed to update status: " + (error.message || String(error)) };
    }
}

export async function deleteContactSubmission(id: string) {
    await requireAuth();

    try {
        await prisma.contactSubmission.delete({
            where: { id },
        });

        revalidatePath("/admin/contacts");
        return { success: true };
    } catch (error: any) {
        console.error("Delete contact submission error:", error);
        return { error: "Failed to delete submission: " + (error.message || String(error)) };
    }
}
