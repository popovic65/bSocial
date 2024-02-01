export class User {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly username: string,
    public readonly password?: string,
    public readonly following?: User[],
    public readonly followedBy?: User[],
    public readonly id?: number,
    public readonly createdAt?: Date
  ) {}
}
