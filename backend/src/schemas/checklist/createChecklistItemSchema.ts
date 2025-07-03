import * as yup from 'yup';

export const createChecklistItemSchema = yup.object({
  studentId: yup
    .string()
    .required()
    .matches(/^c[a-z0-9]{24}$/),
  title: yup.string().required(),
  dueDate: yup.date().required(),
});

export type CreateChecklistItemInput = yup.InferType<
  typeof createChecklistItemSchema
>;
