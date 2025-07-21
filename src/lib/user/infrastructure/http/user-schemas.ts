import { z } from 'zod';

export const createUserSchema = z.object({
    fullName: z.string().min(3),
    email: z.email(),
    password: z.string().min(8),
    role: z.enum(['admin', 'user', 'guest']),
});

export const updateProfileSchema = z.object({
    fullName: z.string().min(3).optional(),
    password: z.string().min(8).optional(),
    role: z.enum(['admin', 'user', 'guest']).optional(),
    status: z.enum(['active', 'inactive', 'banned']).optional(),
});

export const userIdSchema = z.uuidv4('Invalid user id format');
export const userEmailSchema = z.email('Invalid email format');

export const userUpdatePasswordSchema = z.object({
    oldPassword: z.string().min(8),
    newPassword: z.string().min(8),
});