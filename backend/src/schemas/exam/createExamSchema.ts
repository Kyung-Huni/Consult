import * as yup from 'yup';

export const createExamSchema = yup.object({
  type: yup.string().oneOf(['SAT', 'ACT']).required(),
  date: yup.string().required(),
  scores: yup.object().required(), // 시험 종류별 subject-score 객체
});

export type CreateExamInput = yup.InferType<typeof createExamSchema>;
