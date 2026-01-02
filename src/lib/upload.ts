import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function saveImage(file: File): Promise<string> {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    try {
        await mkdir(uploadDir, { recursive: true });
    } catch (error) {
        console.error('Error creating upload directory:', error);
    }

    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');
    const filename = `${timestamp}_${uuidv4()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '-')}`;
    const filepath = path.join(uploadDir, filename)

    await writeFile(filepath, buffer)

    // Return the public URL path
    return `/uploads/${filename}`
}
