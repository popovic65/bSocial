import express from "express";
import {
  loginUserHandler,
  registerUserHandler,
} from "../controllers/auth.controller";
import { validate } from "../middleware/validate";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";

const router = express.Router();

router.post("/register", validate(createUserSchema), registerUserHandler);
router.post("/login", validate(loginUserSchema), loginUserHandler);

export default router;
