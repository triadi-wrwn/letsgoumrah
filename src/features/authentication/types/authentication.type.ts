import { z } from 'zod';
import { LoginFormSchema } from '../data/schema';

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
};

export type LoginFormValues = z.infer<typeof LoginFormSchema>;
