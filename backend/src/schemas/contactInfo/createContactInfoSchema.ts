import * as yup from 'yup';

export const contactInfoSchema = yup.object({
  email: yup.string().email().nullable(),
  phone: yup.string().nullable(),
  address: yup.string().nullable(),
  school: yup.string().nullable(),
  grade: yup.string().nullable(),
});

export type GetContactInfoInput = yup.InferType<typeof contactInfoSchema>;
