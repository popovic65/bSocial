import express from "express";
import morgan from "morgan";
import postRouter from "./api/post.routes";
import { connectProducer } from "./utils/kafka-producer";
import connectDB from "./utils/connectDb";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
connectDB();
connectProducer();

app.use("/api/post", postRouter);

export default app;
