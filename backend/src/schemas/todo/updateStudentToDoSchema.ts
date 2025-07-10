import * as yup from 'yup';

export const updateStudentToDoSchema = yup.object({
  done: yup.boolean().required(),
});
