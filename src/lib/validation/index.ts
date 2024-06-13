import * as z from 'zod';

export const SignUpValidation = z.object({
        name: z.string().min(4, { message: 'Name must contain at least 4 character(s)' }),
        username: z.string().min(4, { message: 'Username must contain at least 4 character(s)' }),
        email: z.string().email(),
        password: z.string().min(8, { message: 'Password must contain at least 8 character(s)' }),
});

export const SignInValidation = z.object({
        email: z.string().email(),
        password: z.string().min(8, { message: 'Password must contain at least 8 character(s)' }),
});

export const ProfileValidation = z.object({
        file: z.custom<File[]>(),
        name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
        username: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
        email: z.string().email(),
        bio: z.string(),
});

// ============================================================
// POST
// ============================================================

export const PostValidation = z.object({
        caption: z
                .string()
                .min(5, { message: 'Minimum 5 characters.' })
                .max(2200, { message: 'Maximum 2,200 caracters' }),
        file: z.custom<File[]>(),
        location: z
                .string()
                .min(1, { message: 'This field is required' })
                .max(1000, { message: 'Maximum 1000 characters.' }),
        tags: z.string(),
});
