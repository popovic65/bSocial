require("dotenv").config();
const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const router = express.Router();

const secretKey = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const response = await axios.post(
      `${process.env.USER_SERVICE_URL}/auth/login`,
      {
        username,
        password,
      }
    );

    if (response.data.status === "success") {
      const token = jwt.sign(response.data.data, secretKey, { expiresIn });

      return res.status(200).json({ token });
    }
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 400) {
        return res.status(400).json({ message: "Bad credentials!" });
      }
    } else return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, username, password, passwordConfirm } =
      req.body;

    if (!firstName || !lastName || !username || !password || !passwordConfirm) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const response = await axios.post(
      `${process.env.USER_SERVICE_URL}/auth/register`,
      {
        firstName,
        lastName,
        username,
        password,
        passwordConfirm,
      }
    );
    response.data.status === "success"
      ? res.status(200).json({ message: "User created!" })
      : res.status(400).json({ message: "Bad request!" });
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      status === 409
        ? res.status(409).json({ message: "Username already exist!" })
        : res.status(500).json({ message: "Internal server error" });
    }
  }
});

module.exports = router;
