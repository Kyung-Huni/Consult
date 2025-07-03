import * as yup from 'yup';

export const createMeetingSchema = yup.object({
  title: yup.string().required(),
  date: yup.string().required(),
  note: yup.string().optional(),
});

export type CreateMeetingInput = yup.InferType<typeof createMeetingSchema>;
