import * as yup from 'yup';

export const getMeetingParamsSchema = yup.object({
  id: yup
    .string()
    .required()
    .matches(/^c[a-z0-9]{24}$/),
});

export type GetMeetingParamsInput = yup.InferType<
  typeof getMeetingParamsSchema
>;
