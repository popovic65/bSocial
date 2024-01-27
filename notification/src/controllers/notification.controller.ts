import { NextFunction, Request, Response } from "express";
import { NotificationService } from "../services/notification.service";
import { NotificationRepository } from "../repository/notification.repository";

const notificationService = new NotificationService(
  new NotificationRepository()
);

export const getNotificationsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.user)
    return res.status(401).json({ message: "Not authenticated user" });

  const { userId } = req.body.user;
  try {
    const data = await notificationService.getNewNotificationForUser(userId);
    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json(err.message);
  }
};
