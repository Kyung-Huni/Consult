import * as yup from 'yup';

export const updateUserSchema = yup.object({
  name: yup.string().min(2),
  email: yup.string().email(),
  password: yup.string().min(8),
});

export type UpdateUserInput = yup.InferType<typeof updateUserSchema>;
