import { PrismaClient } from "@prisma/client";
import {
  ICreatePost,
  IPostRepository,
} from "../interface/repository.interface";
import { Post } from "../models/post.model";

export class PostRepository implements IPostRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async create(data: ICreatePost): Promise<Post> {
    return this._prisma.post.create({
      data,
    });
  }
  async find(limit?: number, offset?: number): Promise<Post[]> {
    return this._prisma.post.findMany({
      take: limit,
      skip: offset,
    });
  }
  async findPosts(
    followingIds: number[],
    limit?: number,
    offset?: number
  ): Promise<Post[]> {
    return this._prisma.post.findMany({
      where: {
        userId: {
          in: followingIds,
        },
      },
      take: limit,
      skip: offset,
    });
  }
  async findOne(id: number): Promise<Post> {
    const Post = await this._prisma.post.findFirst({
      where: { id },
    });
    if (Post) {
      return Promise.resolve(Post);
    }
    throw new Error("Post not found");
  }
}
