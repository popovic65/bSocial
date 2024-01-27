import { PrismaClient } from "@prisma/client";
import {
  ICreateNotification,
  INotificationRepository,
} from "../interface/repository.interface";
import { Notification } from "../models/notification.model";

export class NotificationRepository implements INotificationRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async create(data: ICreateNotification): Promise<Notification> {
    return this._prisma.notification.create({
      data,
    });
  }

  async find(id: number): Promise<Notification[]> {
    return await this._prisma.notification.findMany({
      where: { postCreatorId: id, sent: false },
    });
  }
  async updateNotificationsSentStatus(notifications: Notification[]) {
    await Promise.all(
      notifications.map(async (notification) => {
        await this._prisma.notification.update({
          where: { id: notification.id },
          data: { sent: true },
        });
      })
    );
  }
}
