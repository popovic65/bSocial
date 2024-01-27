export class Notification {
  constructor(
    public readonly content: string,
    public readonly postCreatorId: number,
    public readonly senderUsername: string,
    public readonly senderId: number,
    public readonly sent?: boolean,
    public readonly id?: number,
    public readonly createdAt?: Date
  ) {}
}
