import { Post } from "../models/post.model";

export interface IPostRepository {
  create(data: Post): Promise<Post>;
  find(limit?: number, offset?: number): Promise<Post[]>;
  findOne(id: number): Promise<Post>;
}

export interface ICreatePost {
  content: string;
  userId: number;
  username: string;
}
