import { object, z } from "zod";

export const followUserSchema = object({
  body: object({
    followedId: z.number({ required_error: "Followed is required" }),
  }),
});
