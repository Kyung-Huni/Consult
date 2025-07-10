import * as yup from 'yup';

export const updateTemplateSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
});

export type CreateStudentInput = yup.InferType<typeof updateTemplateSchema>;
