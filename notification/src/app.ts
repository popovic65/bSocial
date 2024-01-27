import express from "express";
import morgan from "morgan";
import notificationRouter from "./api/notification.routes";
import { connectConsumer } from "./utils/kafka-consumer";
import connectDB from "./utils/connectDb";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
connectDB();
connectConsumer();

app.use("/api/notification", notificationRouter);

export default app;
