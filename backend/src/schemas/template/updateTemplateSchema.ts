import * as yup from 'yup';

export const updateTemplateSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
  summary: yup.string().max(200).optional(),
});

export type CreateStudentInput = yup.InferType<typeof updateTemplateSchema>;
