const express = require("express");
const { User, Account } = require("../db.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { userVerification, userSignin } = require("../zod/uservalidation.js");
const { reduce, update } = require("lodash");
const authMiddleware = require("../middlewares/middleware.js");
const userRouter = express.Router();
const updateBody = require("../zod/updateBody.js");

userRouter.post("/signup", async function (req, res) {
  const Userbody = req.body;
  const status = userVerification.safeParse(Userbody);

  if (!status.success) {
    res.status(411).json({
      Error: "Incorrect Inputs",
    });
  }

  const existingUser = await User.findOne({
    username: Userbody.username,
  });

  if (existingUser) {
    res.status(411).json({
      msg: "User already exists!",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const userId = user._id;

  const bankAccount = await Account.create({
    userId: userId,
    balance: 1 + Math.random() * 1000,
  });
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  res.status(200).json({
    message: "user created!",
    token: token,
  });
});

userRouter.post("/signin", async function (req, res) {
  const { username, password } = req.body;

  const { success } = userSignin.safeParse({ username, password });
  if (!success) {
    res.json({ message: "Invalid Inputs" });
  }

  const exists = await User.findOne({ username, password });
  if (!exists) {
    res.status(401).json({
      message: "User doesn't exist / Invalid Credentials",
    });
  }
  const token = jwt.sign({ userId: exists._id }, process.env.JWT_SECRET);
  req.headers.authorization = token;
  res.json({
    token,
  });
});

userRouter.put("/update", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    res.status(403).json({
      msg: "Wrong Inputs!",
    });
  }

  await User.updateOne({ _id: req.body.userId }, req.body);

  res.json({
    message: "updated ",
  });
});

userRouter.get("/bulk", authMiddleware, async (req, res) => {
  const findUser = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: findUser,
        },
      },
      {
        lastName: {
          $regex: findUser,
        },
      },
    ],
  });

  res.json({
    msg: "Done Fetching Users",
    users: users,
  });
});
module.exports = userRouter;
