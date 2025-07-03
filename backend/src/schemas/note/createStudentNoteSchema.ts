import * as yup from 'yup';

export const createStudentNoteSchema = yup.object({
  content: yup.string().required(),
});

export type CreateStudentNoteInput = yup.InferType<
  typeof createStudentNoteSchema
>;
