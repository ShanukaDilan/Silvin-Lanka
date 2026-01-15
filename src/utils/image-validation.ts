/**
 * Image validation and sanitization utilities
 * Centralizes image path validation logic used across public pages
 */

import fs from 'fs';
import path from 'path';

/**
 * Validates an image path and returns a safe fallback if needed
 * Server-side only - uses synchronous fs operations
 * 
 * @param imagePath - The image path to validate (can be null/undefined)
 * @param fallbackUrl - The fallback URL to use if image is invalid
 * @returns Valid image URL or fallback
 */
export function validateImagePath(
    imagePath: string | null | undefined,
    fallbackUrl: string
): string {
    // Return fallback if no image provided
    if (!imagePath) {
        return fallbackUrl;
    }

    // External URLs are assumed valid
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }

    // For uploaded images, verify file exists
    if (imagePath.startsWith('/uploads/')) {
        const filePath = path.join(process.cwd(), 'public', imagePath);

        // Check if file exists, use fallback if not
        if (!fs.existsSync(filePath)) {
            return fallbackUrl;
        }
    }

    return imagePath;
}

/**
 * Sanitizes HTML content to prevent XSS attacks
 * Uses DOMPurify in a server-safe way
 * 
 * @param html - Raw HTML string from database
 * @returns Sanitized HTML string safe for rendering
 */
export function sanitizeHtml(html: string | null | undefined): string {
    if (!html) {
        return '';
    }

    // For server-side rendering, we need isomorphic-dompurify
    // which works in both browser and Node.js environments
    const createDOMPurify = require('isomorphic-dompurify');
    const DOMPurify = createDOMPurify();

    // Configure DOMPurify to allow common safe HTML tags
    const clean = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre', 'hr', 'div', 'span'
        ],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style'],
        ALLOW_DATA_ATTR: false,
    });

    return clean;
}
