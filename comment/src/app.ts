import express from "express";
import commentRouter from "./api/comment.routes";
import { connectProducer } from "./utils/kafka-producer";
import connectDB from "./utils/connectDb";

const app = express();
app.use(express.json());
connectDB();
connectProducer();

app.use("/api/comment", commentRouter);

export default app;
