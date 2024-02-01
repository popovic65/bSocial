import express from "express";
import {
  findByUsernameController,
  findUserController,
  findUsersController,
  followUserController,
  getFollowersController,
  getFollowingController,
  getUserHandler,
} from "../controllers/user.controller";
import { followUserSchema } from "../schemas/follow.schema";
import { validate } from "../middleware/validate";

const router = express.Router();

router.get("/me", getUserHandler);
router.get("/:username", findByUsernameController);
router.get("/", findUsersController);
router.post("/follow", validate(followUserSchema), followUserController);
router.get("/following/:id", getFollowingController);
router.get("/followers/:id", getFollowersController);

export default router;
