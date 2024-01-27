require("dotenv").config();
const express = require("express");
const proxy = require("express-http-proxy");
const authRouter = require("./routes/auth.route");
const authenticateJWT = require("./routes/middleware/auth");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", authenticateJWT, proxy(`${process.env.USER_SERVICE_URL}`));
app.use("/post", authenticateJWT, proxy(`${process.env.POST_SERVICE_URL}`));
app.use(
  "/comment",
  authenticateJWT,
  proxy(`${process.env.COMMENT_SERVICE_URL}`)
);
app.use(
  "/notification",
  authenticateJWT,
  proxy(`${process.env.NOTIFICATION_SERVICE_URL}`)
);

app.all("*", (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.statusCode = 404;
  next(error);
});

app.listen(PORT, () => {
  console.log(`API Gateway running on:${PORT}`);
});
