import * as yup from 'yup';

export const updateStudentCollegeSchema = yup.object({
  status: yup.string().optional(), // 'Applied', 'Accepted', 'Rejected' 등
  isSuggested: yup.boolean().optional(),
});
