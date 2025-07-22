// schemas/student/getStudentCollegeParamsSchema.ts
import * as yup from 'yup';

export const getStudentCollegeParamsSchema = yup.object({
  id: yup
    .string()
    .required()
    .matches(/^c[a-z0-9]{24}$/),
  // studentId
  collegeId: yup.string().required(), // collegeId
});

export type GetStudentCollegeParamsInput = yup.InferType<
  typeof getStudentCollegeParamsSchema
>;
