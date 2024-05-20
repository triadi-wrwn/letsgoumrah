import { z } from 'zod';

const LoginFormSchema = z.object({
  username: z.string().min(1, { message: 'Username is required.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
  rememberMe: z.boolean()
});

export { LoginFormSchema };
