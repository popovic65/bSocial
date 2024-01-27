import { ICreateNotification } from "../interface/repository.interface";
import { NotificationRepository } from "../repository/notification.repository";

export class NotificationService {
  private _repository: NotificationRepository;

  constructor(repository: NotificationRepository) {
    this._repository = repository;
  }

  async createNotification(input: ICreateNotification) {
    const data = await this._repository.create(input);
    if (!data.id) {
      throw new Error("Unable to create notification");
    }
    return data;
  }

  async getNewNotificationForUser(userId: number) {
    const notifications = await this._repository.find(userId);
    await this._repository.updateNotificationsSentStatus(notifications);
    return notifications;
  }
}
