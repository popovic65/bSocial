import { User } from "../models/user.model";

export interface IUserRepository {
  create(data: User): Promise<User>;
  find(limit?: number, offset?: number): Promise<User[]>;
  findOne(id: number): Promise<User>;
}

export interface ICreateUser {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}
