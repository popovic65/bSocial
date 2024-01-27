import express from "express";
import { getNotificationsByUserId } from "../controllers/notification.controller";

const router = express.Router();

router.post("/", getNotificationsByUserId);

export default router;
