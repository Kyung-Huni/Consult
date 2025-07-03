import * as yup from 'yup';

export const createStudentSchema = yup.object({
  nameame: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  school: yup.string().required(),
  grade: yup.string(),
});

export type CreateStudentInput = yup.InferType<typeof createStudentSchema>;
