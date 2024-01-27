export class Post {
  constructor(
    public readonly content: string,
    public readonly username: string,
    public readonly userId?: number,
    public readonly id?: number,
    public readonly createdAt?: Date
  ) {}
}
