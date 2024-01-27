import express from "express";
import morgan from "morgan";
import { connectConsumer } from "./utils/kafka-consumer";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
connectConsumer();

export default app;
