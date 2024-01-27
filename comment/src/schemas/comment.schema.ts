import { object, z } from "zod";

export const commentSchema = object({
  body: object({
    postId: z.number({ required_error: "postId is required!" }),
    content: z.string({ required_error: "content is required!" }),
    postCreatorId: z.number({ required_error: "postCreatorId is required!" }),
  }),
});
