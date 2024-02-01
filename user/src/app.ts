require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import AppError from "./utils/appError";
import authRouter from "./api/auth.routes";
import userRouter from "./api/user.routes";
import { connectProducer } from "./utils/kafka";
import connectDB from "./utils/connectDb";

const app = express();

app.use(express.json({ limit: "10kb" }));

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use("/api/users", userRouter);

app.get("/api/healthChecker", async (_, res: Response) => {
  res.status(200).json({
    status: "success",
  });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, `Route ${req.originalUrl} not found`));
});

app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  error.status = error.status || "error";
  error.statusCode = error.statusCode || 500;

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
});
connectDB();
connectProducer();

export default app;
