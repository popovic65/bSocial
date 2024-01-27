import { object, z } from "zod";

export const postSchema = object({
  body: object({
    content: z.string({ required_error: "Content is required!" }),
  }),
});
