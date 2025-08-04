
import z from "zod";

export const authLoginSchema = z.object({
    email: z.email('Invalid email format'),
    password: z.string().min(8),
});

export const registerUserSchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.email('Invalid email format'),
    password: z.string().min(8),
});

export const requestResetPasswordSchema = z.object({
    email: z.email('Invalid email format'),
});
export const resetPasswordSchema = z.object({
    token: z.uuidv4('Invalid token format'),
    newPassword: z.string().min(8,'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});