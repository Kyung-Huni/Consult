import * as yup from 'yup';

export const createTimeLogSchema = yup.object({
  date: yup.string().required(),
  duration: yup.number().required().positive().integer(),
  description: yup.string().required(),
  billable: yup.boolean().required(),
  status: yup.string().oneOf(['paid', 'unpaid', 'invoiced']).required(),
});

export type CreateTimeLogInput = yup.InferType<typeof createTimeLogSchema>;
