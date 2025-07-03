import * as yup from 'yup';

export const updateAccessSchema = yup.object({
  allowLogin: yup.boolean(),
  canEditChecklist: yup.boolean(),
});

export type UpdateAccessInput = yup.InferType<typeof updateAccessSchema>;
