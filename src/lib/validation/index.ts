import * as z from 'zod';

export const SignUpValidation = z.object({
        name: z.string().min(4, { message: 'Name must contain at least 4 character(s)' }),
        username: z.string().min(4, { message: 'Username must contain at least 4 character(s)' }),
        email: z.string().email(),
        password: z.string().min(8, { message: 'Password must contain at least 8 character(s)' }),
});
