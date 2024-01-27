import express from "express";
import {
  createPost,
  getFollowingPosts,
  getPosts,
} from "../controllers/post.controller";
import { validate } from "../middleware/validate";
import { postSchema } from "../schemas/post.schema";

const router = express.Router();

router.post("/", validate(postSchema), createPost);
router.get("/", getPosts);
router.post("/following", getFollowingPosts);

export default router;
