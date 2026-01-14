import { z } from "zod";

export const adminSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .optional()
        .or(z.literal("")),
});

export type AdminFormValues = z.infer<typeof adminSchema>;
