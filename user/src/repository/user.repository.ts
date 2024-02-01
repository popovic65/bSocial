import { PrismaClient } from "@prisma/client";
import {
  ICreateUser,
  IUserRepository,
} from "../interface/repository.interface";
import { User } from "../models/user.model";

export class UserRepository implements IUserRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async create(data: ICreateUser): Promise<User> {
    return this._prisma.user.create({
      data,
    });
  }
  async find(limit?: number, offset?: number): Promise<User[]> {
    return this._prisma.user.findMany({
      take: limit,
      skip: offset,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        createdAt: true,
      },
    });
  }
  async findUsers(
    followingIds: number[],
    limit?: number,
    offset?: number
  ): Promise<User[]> {
    return this._prisma.user.findMany({
      where: {
        id: {
          in: followingIds,
        },
      },
      take: limit,
      skip: offset,
    });
  }
  async findOne(id: number): Promise<User> {
    const user = await this._prisma.user.findFirst({
      where: { id },
      include: { following: true },
    });
    if (user) {
      return Promise.resolve(user);
    }
    throw new Error("User not found");
  }
  async findOneByUsername(username: string): Promise<User> {
    const user = await this._prisma.user.findFirst({
      where: { username },
      include: { following: true },
    });
    if (user) {
      return Promise.resolve(user);
    }
    throw new Error("User not found");
  }
  async findOneFollowers(id: number) {
    const user = await this._prisma.user.findFirst({
      where: { id },
      include: { followedBy: true },
    });
    if (user) {
      return Promise.resolve(user);
    }
    throw new Error("User not found");
  }
  async followUser(followerId: number, followedId: number): Promise<boolean> {
    const follow = await this._prisma.user.update({
      where: { id: followerId },
      data: { following: { connect: { id: followedId } } },
    });
    return follow ? true : false;
  }
}
