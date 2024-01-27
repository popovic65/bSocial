import { NextFunction, Request, Response } from "express";
import { CreateUserInput, LoginUserInput } from "../schemas/user.schema";
import { createUser, findUserBy } from "../services/user.service";
import AppError from "../utils/appError";
import { User } from "../entities/user.entity";

export const registerUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, username, password } = req.body;

    const user = await createUser({
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
    const user = await findUserBy({ username });

    if (!user || !(await User.comparePasswords(password, user.password))) {
      return next(new AppError(400, "Invalid email or password"));
    }
    const following = user.following.map((e) => e.id);
    const data = { userId: user.id, username, following };

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err: any) {
    next(err);
  }
};
