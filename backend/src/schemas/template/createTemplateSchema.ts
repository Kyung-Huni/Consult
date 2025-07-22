import * as yup from 'yup';

export const createTemplateSchema = yup.object({
  type: yup
    .string()
    .oneOf(['checklist', 'meeting', 'note', 'college', 'email'])
    .required(),
  title: yup.string().required(),
  content: yup.string().required(),
  summary: yup.string().max(200).optional(),
});

export type CreateStudentInput = yup.InferType<typeof createTemplateSchema>;
