import * as yup from 'yup';

export const getCollegeInfoSchema = yup.object({
  id: yup.string().optional(),
  name: yup.string(),
  location: yup.string().optional(),
  status: yup.string().default('Recommended').optional(),
  isSuggested: yup.boolean().optional(),
});

export type GetCollegeInfoInput = yup.InferType<typeof getCollegeInfoSchema>;
