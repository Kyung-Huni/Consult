import * as yup from 'yup';

export const createMeetingSchema = yup.object({
  title: yup.string().required(),
  note: yup.string().optional(),
  startTime: yup.string().required(),
  endTime: yup.string().required(),
});

export type CreateMeetingInput = yup.InferType<typeof createMeetingSchema>;
