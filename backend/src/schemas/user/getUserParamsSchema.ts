import * as yup from 'yup';

export const getUserParamsSchema = yup.object({
  id: yup.string().required().uuid(),
});

export type GetUserParamsInput = yup.InferType<typeof getUserParamsSchema>;
