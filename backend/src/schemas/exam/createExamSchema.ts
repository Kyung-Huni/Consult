import * as yup from 'yup';

export const createExamSchema = yup.object({
  type: yup.string().oneOf(['SAT', 'ACT']).required(),
  date: yup.string().required(),
  // scores: yup.object().required(), 해결X
});

export type CreateExamInput = yup.InferType<typeof createExamSchema>;
