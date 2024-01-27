require("dotenv");
import { DeepPartial } from "typeorm";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../utils/data-source";
import { sendMessage } from "../utils/kafka";
const userRepository = AppDataSource.getRepository(User);

export const createUser = async (input: DeepPartial<User>) => {
  const user = await userRepository.save(userRepository.create(input));
  if (user) {
    sendMessage("user-created", user);
    return user;
  }
  return undefined;
};

export const findUserBy = async (options: {
  username?: string;
  userId?: number;
}): Promise<User | null> => {
  if (options.username) {
    return await userRepository.findOne({
      where: { username: options.username },
      relations: ["following"],
    });
  } else if (options.userId) {
    return await userRepository.findOne({
      where: {
        id: options.userId,
      },
      relations: ["following"],
    });
  }
  return null;
};
export const findUserWithFollowing = async (username: string) => {
  return await userRepository.findOne({
    where: { username },
    relations: ["following"],
  });
};
export const findUsers = async (query: Object) => {
  return await userRepository.find(query);
};
export const followUser = async (
  followerId: number,
  followedId: number
): Promise<boolean> => {
  console.log(followerId, " ", followedId);
  if (followerId === followedId) {
    return false;
  }

  const follower = await userRepository.findOne({
    where: { id: followerId },
    relations: ["following"],
  });

  const followed = await userRepository.findOne({
    where: { id: followedId },
    relations: ["followers"],
  });

  if (follower && followed) {
    const isAlreadyFollowing = follower.following.some(
      (user) => user.id === followedId
    );

    if (!isAlreadyFollowing) {
      followed.followers = [...followed.followers, follower];
      await userRepository.save(followed);
      return true;
    } else {
      return false;
    }
  }

  return false;
};

export const getFollowing = async (userId: number): Promise<User[]> => {
  const user = await userRepository.findOne({
    where: { id: userId },
    relations: ["following"],
  });
  return user ? user.following : [];
};
export const getFollowers = async (userId: number): Promise<User[]> => {
  const user = await userRepository.findOne({
    where: { id: userId },
    relations: ["followers"],
  });
  return user ? user.followers : [];
};
