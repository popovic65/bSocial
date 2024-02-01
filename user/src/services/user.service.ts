import { ICreateUser } from "../interface/repository.interface";
import { UserRepository } from "../repository/user.repository";
import { sendMessage } from "../utils/kafka";
import { hashPassword, toJSON } from "../utils/util";

export class UserService {
  private _repository: UserRepository;

  constructor(repository: UserRepository) {
    this._repository = repository;
  }

  async createUser(input: ICreateUser) {
    try {
      const hashedPassword = await hashPassword(input.password);
      const inputDataWithHashedPassword = {
        ...input,
        password: hashedPassword,
      };
      const data = await this._repository.create(inputDataWithHashedPassword);
      sendMessage("user-created", data);
      return toJSON(data);
    } catch (error: any) {
      if (error.code === "23505") {
        throw new Error(
          "Username already exists. Please choose a different username."
        );
      } else {
        console.error("Error occurred while creating user:", error);
        throw new Error("Unable to create user.");
      }
    }
  }

  async getUsers(limit?: number, offset?: number) {
    const data = await this._repository.find(limit, offset);
    return data;
  }
  async getUsersForUser(
    followingIds: number[],
    limit?: number,
    offset?: number
  ) {
    const Users = await this._repository.findUsers(followingIds, limit, offset);
    return Users;
  }

  async findUserBy(options: { username?: string; userId?: number }) {
    if (options.username) {
      const user = await this._repository.findOneByUsername(options.username);
      return toJSON(user);
    } else if (options.userId) {
      const user = await this._repository.findOne(options.userId);
      return toJSON(user);
    }
    return null;
  }

  async findUsers(limit?: number, offset?: number) {
    return await this._repository.find(limit, offset);
  }
  async followUser(followerId: number, followedId: number) {
    try {
      if (followerId === followedId) {
        throw new Error("Follower and followed user cannot be the same.");
      }

      const follower = await this._repository.findOne(followerId);
      const followed = await this._repository.findOneFollowers(followedId);

      if (!follower) {
        throw new Error("Follower not found.");
      }

      if (!followed) {
        throw new Error("Followed user not found.");
      }

      const isAlreadyFollowing = (follower.following ?? []).some(
        (user) => user.id === followedId
      );
      if (isAlreadyFollowing) {
        throw new Error("Already following the user.");
      }

      return await this._repository.followUser(followerId, followedId);
    } catch (error: any) {
      console.error("Error occurred while following user:", error.message);
      return false;
    }
  }

  async getFollowing(userId: number) {
    try {
      const user = await this._repository.findOne(userId);
      let following: any = [];
      if (user && user.following) {
        following = user.following.map((e) => {
          return { id: e.id, username: e.username };
        });
      }
      return following;
    } catch (error: any) {
      console.error(
        "Error occurred while fetching user's following:",
        error.message
      );
      return [];
    }
  }
  async getFollowers(userId: number) {
    try {
      const user = await this._repository.findOneFollowers(userId);
      let followers: any = [];

      if (user.followedBy.length)
        followers = user.followedBy.map((e) => {
          return { id: e.id, username: e.username };
        });
      return followers;
    } catch (error: any) {
      console.error(
        "Error occurred while fetching user's following:",
        error.message
      );
      return [];
    }
  }
}
