
import z from "zod";

export const authLoginSchema = z.object({
    email: z.email('Invalid email format'),
    password: z.string().min(8),
});