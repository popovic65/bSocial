import { ICreatePost } from "../interface/repository.interface";
import { PostRepository } from "../repository/post.repository";
import { sendMessage } from "../utils/kafka-producer";

export class PostService {
  private _repository: PostRepository;

  constructor(repository: PostRepository) {
    this._repository = repository;
  }

  async createPost(input: ICreatePost) {
    const data = await this._repository.create(input);
    if (!data.id) {
      throw new Error("Unable to create post");
    }
    sendMessage("post-created", data);
    return data;
  }

  async getPosts(limit?: number, offset?: number) {
    const posts = await this._repository.find(limit, offset);
    return posts;
  }
  async getPostsForUser(
    followingIds: number[],
    limit?: number,
    offset?: number
  ) {
    const posts = await this._repository.findPosts(followingIds, limit, offset);
    return posts;
  }

  async getPost(id: number) {
    const post = await this._repository.findOne(id);
    return post;
  }
}
