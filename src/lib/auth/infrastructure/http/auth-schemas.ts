
import z from "zod";

export const authLoginSchema = z.object({
    email: z.email('Invalid email format'),
    password: z.string().min(8),
});

export const registerUserSchema = z.object({
    fullName: z.string().min(3),
    email: z.email('Invalid email format'),
    password: z.string().min(8),
});