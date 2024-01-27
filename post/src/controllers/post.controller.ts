import { NextFunction, Request, Response } from "express";
import { PostService } from "../services/post.service";
import { PostRepository } from "../repository/post.repository";

const postService = new PostService(new PostRepository());

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.user)
      return res.send(401).json({ message: "Not authenticated user" });
    const { content } = req.body;
    const { userId, username } = req.body.user;
    const data = await postService.createPost({ content, userId, username });

    return res.status(201).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json(err.message);
  }
};

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const limit = req.query["limit"] ? Number(req.query["limit"]) : 50;
  const offset = req.query["offset"] ? Number(req.query["offset"]) : 0;

  try {
    const data = await postService.getPosts(limit, offset);
    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json(err.message);
  }
};

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id) || 0;

  try {
    const data = await postService.getPost(id);
    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json(err.message);
  }
};
export const getFollowingPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const limit = req.body.limit ? Number(req.body.limit) : 50;
  const offset = req.body.offset ? Number(req.body.limit) : 0;
  if (!req.body.user)
    return res.send(401).json({ message: "Not authenticated user" });
  const { userId, following } = req.body.user;
  following.push(userId);
  console.log(following);
  try {
    const data = await postService.getPostsForUser(following, limit, offset);
    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json(err.message);
  }
};
