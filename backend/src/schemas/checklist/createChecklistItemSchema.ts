import * as yup from 'yup';

export const createChecklistItemSchema = yup.object({
  title: yup.string().required(),
  dueDate: yup.date().required(),
});

export type CreateChecklistItemInput = yup.InferType<
  typeof createChecklistItemSchema
>;
