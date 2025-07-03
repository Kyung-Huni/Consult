import * as yup from 'yup';

export const createUserSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export type CreateUserInput = yup.InferType<typeof createUserSchema>;
