import { NextFunction, Request, Response } from "express";
import { CommentService } from "../services/comment.service";
import { CommentRepository } from "../repository/comment.repository";

const commentService = new CommentService(new CommentRepository());

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.user)
      return res.send(401).json({ message: "Not authenticated user" });

    const { content, postId, postCreatorId } = req.body;
    const { userId, username } = req.body.user;
    const data = await commentService.createComment({
      content,
      senderId: userId,
      senderUsername: username,
      postId,
      postCreatorId,
    });

    return res.status(201).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json(err.message);
  }
};

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const limit = req.query["limit"] ? Number(req.query["limit"]) : 50;
  const offset = req.query["offset"] ? Number(req.query["offset"]) : 0;

  try {
    const data = await commentService.getComments(limit, offset);
    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json(err.message);
  }
};

export const getCommentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);

  try {
    const data = await commentService.getComment(id);
    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json(err.message);
  }
};
export const getCommentsByPostId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  try {
    const data = await commentService.getCommentsByPostId(id);
    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json(err.message);
  }
};
