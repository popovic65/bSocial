require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

const authenticateJWT = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    if (decodedToken) req.body.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};
module.exports = authenticateJWT;
