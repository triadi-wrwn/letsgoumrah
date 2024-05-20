import { z } from 'zod';

const userFormSchema = z.object({
  code: z.string(),
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string(),
  userGroupId: z.string(),
  jobPosition: z.string(),
  departmentId: z.string()
});

export { userFormSchema };
