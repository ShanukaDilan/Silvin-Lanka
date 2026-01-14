"use server";

import { saveImage } from "@/lib/upload";
import { revalidatePath } from "next/cache";

import { requireAuth } from "@/lib/auth-utils";

export async function uploadImageAction(formData: FormData) {
    await requireAuth();
    const file = formData.get("file") as File;

    if (!file) {
        return { error: "No file provided" };
    }

    try {
        const url = await saveImage(file);
        revalidatePath("/admin/media");
        return { url };
    } catch (error) {
        console.error("Upload error:", error);
        return { error: "Failed to upload image" };
    }
}

export async function uploadImagesAction(formData: FormData) {
    await requireAuth();
    const files = formData.getAll("files") as File[]; // Note: using "files" key

    if (!files || files.length === 0) {
        return { error: "No files provided" };
    }

    try {
        const urls = await Promise.all(
            files.map(async (file) => {
                if (file.size > 0 && file.name !== "undefined") {
                    return await saveImage(file);
                }
                return null;
            })
        );

        // Filter out any nulls if file validation failed inside map (though basic check is above)
        const validUrls = urls.filter((url): url is string => url !== null);

        revalidatePath("/admin/media");
        return { urls: validUrls };
    } catch (error) {
        console.error("Bulk upload error:", error);
        return { error: "Failed to upload images" };
    }
}
