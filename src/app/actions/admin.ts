"use server";

import prisma from "@/lib/prisma";
import { adminSchema, AdminFormValues } from "@/lib/validations/admin";
import { revalidatePath } from "next/cache";
import * as bcrypt from "bcryptjs";
import { requireAuth } from "@/lib/auth-utils";

export async function getAdmins() {
    await requireAuth();
    try {
        const admins = await prisma.admin.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
            }
        });
        return admins;
    } catch (error) {
        console.error("Failed to fetch admins:", error);
        return [];
    }
}

export async function getAdmin(id: string) {
    await requireAuth();
    try {
        const admin = await prisma.admin.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                // Do not select password
            }
        });
        return admin;
    } catch (error) {
        console.error("Failed to fetch admin:", error);
        return null;
    }
}

export async function createAdmin(data: AdminFormValues) {
    await requireAuth();
    const result = adminSchema.safeParse(data);

    if (!result.success) {
        return { error: "Invalid data" };
    }

    if (!result.data.password) {
        return { error: "Password is required for new users" };
    }

    try {
        const existingUser = await prisma.admin.findUnique({
            where: { email: result.data.email },
        });

        if (existingUser) {
            return { error: "User with this email already exists" };
        }

        const hashedPassword = await bcrypt.hash(result.data.password, 10);

        await prisma.admin.create({
            data: {
                email: result.data.email,
                name: result.data.name,
                password: hashedPassword,
            },
        });

        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Create admin error:", error);
        return { error: "Failed to create admin" };
    }
}

export async function updateAdmin(id: string, data: AdminFormValues) {
    await requireAuth();
    const result = adminSchema.safeParse(data);

    if (!result.success) {
        return { error: "Invalid data" };
    }

    try {
        const updateData: any = {
            email: result.data.email,
            name: result.data.name,
        };

        if (result.data.password && result.data.password.length > 0) {
            updateData.password = await bcrypt.hash(result.data.password, 10);
        }

        await prisma.admin.update({
            where: { id },
            data: updateData,
        });

        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Update admin error:", error);
        return { error: "Failed to update admin" };
    }
}

export async function deleteAdmin(id: string) {
    const session = await requireAuth();

    // Prevent self-deletion
    if (session.user?.email) {
        const currentUser = await prisma.admin.findUnique({ where: { email: session.user.email } });
        if (currentUser && currentUser.id === id) {
            return { error: "You cannot delete your own account" };
        }
    }

    try {
        // Check if it's the last admin
        const adminCount = await prisma.admin.count();
        if (adminCount <= 1) {
            return { error: "Cannot delete the last admin" };
        }

        await prisma.admin.delete({ where: { id } });
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Delete admin error:", error);
        return { error: "Failed to delete admin" };
    }
}
