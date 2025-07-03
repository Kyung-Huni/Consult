import * as yup from 'yup';

export const createConversationSchema = yup.object({
  sender: yup.string().required(),
  text: yup.string().required(),
});

export type CreateConversationInput = yup.InferType<
  typeof createConversationSchema
>;
