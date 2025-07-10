import * as yup from 'yup';

export const createStudentToDoSchema = yup.object({
  text: yup.string().required(),
  due: yup.string().required(),
});
