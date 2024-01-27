import { Comment } from "../models/comment.model";

export interface ICommentRepository {
  create(data: Comment): Promise<Comment>;
  find(limit?: number, offset?: number): Promise<Comment[]>;
  findOne(id: number): Promise<Comment>;
}

export interface ICreateComment {
  postId: number;
  postCreatorId: number;
  content: string;
  senderId: number;
  senderUsername: string;
}
