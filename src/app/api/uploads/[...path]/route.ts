import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import mime from "mime";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ path: string[] }> }
) {
    // Await params as per Next.js 15+ requirements
    const { path: paramsPath } = await context.params;

    if (!paramsPath || paramsPath.length === 0) {
        return new NextResponse("File not found", { status: 404 });
    }

    const filename = paramsPath.join("/");
    // Security check: Prevent directory traversal
    if (filename.includes("..")) {
        return new NextResponse("Invalid path", { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadsDir, filename);

    // Verify file exists
    if (!fs.existsSync(filePath)) {
        return new NextResponse("File not found", { status: 404 });
    }

    try {
        const fileBuffer = fs.readFileSync(filePath);
        const contentType = mime.getType(filePath) || "application/octet-stream";

        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("Error serving file:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
