import { PrismaClient } from "@prisma/client";
import {
  ICreateComment,
  ICommentRepository,
} from "../interface/repository.interface";
import { Comment } from "../models/comment.model";

export class CommentRepository implements ICommentRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async create(data: ICreateComment): Promise<Comment> {
    return this._prisma.comment.create({
      data,
    });
  }
  async find(limit?: number, offset?: number): Promise<Comment[]> {
    return this._prisma.comment.findMany({
      take: limit,
      skip: offset,
    });
  }
  async findOne(id: number): Promise<Comment> {
    const comment = await this._prisma.comment.findFirst({
      where: { id },
    });
    if (comment) {
      return Promise.resolve(comment);
    }
    throw new Error("Comment not found");
  }
  async findByPost(
    postId: number,
    limit?: number,
    offset?: number
  ): Promise<Comment[]> {
    return this._prisma.comment.findMany({
      where: { postId },
      take: limit,
      skip: offset,
    });
  }
}
