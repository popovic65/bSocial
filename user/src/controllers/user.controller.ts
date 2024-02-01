import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repository/user.repository";
import { UserService } from "../services/user.service";

const userService = new UserService(new UserRepository());

export const getUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.user)
      return res.status(401).json({ message: "Not authenticated user" });

    const user = req.body.user;

    res.status(200).status(200).json({
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const findUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    const data = await { userId };

    if (data) {
      return res.status(200).json({ data: data });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const findByUsernameController = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    console;
    const data = await userService.findUserBy({ username });
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const findUsersController = async (req: Request, res: Response) => {
  try {
    const limit = req.query["limit"] ? Number(req.query["limit"]) : 50;
    const offset = req.query["offset"] ? Number(req.query["offset"]) : 0;
    const data = await userService.findUsers(limit, offset);

    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: "Users not found" });
    }
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const followUserController = async (req: Request, res: Response) => {
  if (!req.body.user)
    return res.status(401).json({ message: "Not authenticated user" });

  const { followedId } = req.body;
  const { userId } = req.body.user;
  try {
    const success = await userService.followUser(userId, followedId);
    if (success) {
      res.status(200).send({ message: "User followed successfully" });
    } else {
      res
        .status(400)
        .send({ message: "User is already followed or does not exist!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getFollowingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const userId = parseInt(id, 10);
    const following = await userService.getFollowing(userId);
    res.status(200).json(following);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
export const getFollowersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const userId = parseInt(id, 10);
    const followers = await userService.getFollowers(userId);
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
