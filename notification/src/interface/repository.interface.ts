import { Notification } from "../models/notification.model";

export interface INotificationRepository {
  create(data: Notification): Promise<Notification>;
  find(id: number): Promise<Notification[]>;
}

export interface ICreateNotification {
  postId: number;
  postCreatorId: number;
  content: string;
  senderId: number;
  senderUsername: string;
  sent?: boolean;
}
