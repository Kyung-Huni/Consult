import * as yup from 'yup';

export const getItemParamsSchema = yup.object({
  id: yup
    .string()
    .required()
    .matches(/^c[a-z0-9]{24}$/),
});

export type GetItemParamsInput = yup.InferType<typeof getItemParamsSchema>;
