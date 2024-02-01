import { NextFunction, Request, Response } from "express";
import { CreateUserInput, LoginUserInput } from "../schemas/user.schema";
import AppError from "../utils/appError";
import { UserService } from "../services/user.service";
import { UserRepository } from "../repository/user.repository";
import { comparePasswords } from "../utils/util";

const userService = new UserService(new UserRepository());

export const registerUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, username, password } = req.body;

    const user = await userService.createUser({
      firstName,
      lastName,
      username,
      password,
    });

    res.status(201).json({
      status: "success",
      user,
    });
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(409).json({
        status: "fail",
        message: "User with that username already exist!",
      });
    }
    next(err);
  }
};

export const loginUserHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const user = await userService.getUserLoginData(username);
    if (!user.password || !(await comparePasswords(password, user.password))) {
      return next(new AppError(400, "Invalid email or password"));
    }
    const data = { userId: user.id, username, following: user.followingIds };

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(409).json({
        status: "fail",
        message: "User with that username already exist!",
      });
    }
    next(err);
  }
};
