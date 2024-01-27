import { ICreateComment } from "../interface/repository.interface";
import { CommentRepository } from "../repository/comment.repository";
import { sendMessage } from "../utils/kafka-producer";

export class CommentService {
  private _repository: CommentRepository;

  constructor(repository: CommentRepository) {
    this._repository = repository;
  }

  async createComment(input: ICreateComment) {
    const data = await this._repository.create(input);
    if (!data.id) {
      throw new Error("Unable to create comment");
    }
    sendMessage("comment-created", data);
    return data;
  }

  async getComments(limit?: number, offset?: number) {
    const comments = await this._repository.find(limit, offset);
    return comments;
  }

  async getComment(id: number) {
    const comment = await this._repository.findOne(id);
    return comment;
  }
  async getCommentsByPostId(postId: number) {
    const comment = await this._repository.findByPost(postId);
    return comment;
  }
}
