import * as yup from 'yup';

export const getUserLoginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export type GetUserLoginInput = yup.InferType<typeof getUserLoginSchema>;
