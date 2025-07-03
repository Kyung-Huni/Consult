import * as yup from 'yup';

export const getStudentParamsSchema = yup.object({
  id: yup
    .string()
    .required()
    .matches(/^c[a-z0-9]{24}$/),
});

export type GetStudentParamsInput = yup.InferType<
  typeof getStudentParamsSchema
>;
