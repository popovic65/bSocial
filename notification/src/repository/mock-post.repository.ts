// import { IPostRepository } from "../interface/repository.interface";
// import { Post } from "../models/notification.model";

// export class MockPostRepository implements IPostRepository {
//   create(data: Post): Promise<Post> {
//     const mockPost = {
//       id: 123,
//       ...data,
//     } as Post;
//     return Promise.resolve(mockPost);
//   }

//   find(limit: number, offset: number): Promise<Post[]> {
//     return Promise.resolve([]);
//   }
//   findOne(id: number): Promise<Post> {
//     return Promise.resolve({ id } as unknown as Post);
//   }
// }
