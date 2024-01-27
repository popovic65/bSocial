import express from "express";
import {
  createComment,
  getCommentsByPostId,
} from "../controllers/comment.controller";
import { validate } from "../middleware/validate";
import { commentSchema } from "../schemas/comment.schema";

const router = express.Router();

router.post("/", validate(commentSchema), createComment);
router.get("/:id", getCommentsByPostId);

export default router;
