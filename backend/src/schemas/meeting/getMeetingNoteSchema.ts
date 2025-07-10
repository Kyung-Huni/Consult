import * as yup from 'yup';

export const getMeetingNoteSchema = yup.object({
  note: yup.string().required(),
});

export type GetMeetingNoteInput = yup.InferType<typeof getMeetingNoteSchema>;
