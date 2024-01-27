export class Comment {
  constructor(
    public readonly content: string,
    public readonly postCreatorId: number,
    public readonly senderId: number,
    public readonly senderUsername: string,
    public readonly postId: number,
    public readonly id?: number,
    public readonly createdAt?: Date
  ) {}
}
