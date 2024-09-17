const express = require("express");
const { Account } = require("../db.js");
const { default: mongoose } = require("mongoose");
const accountRouter = express();
const authMiddleware = require("../middlewares/middleware.js");
accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const balance =
    (await Account.findOne({
      userId: req.body.userId,
    })) || undefined;

  if (!balance) {
    res.json({
      msg: "No user found!",
    });
  }

  res.json({
    balance: balance.balance,
  });
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  const { amount, to } = req.body;

  const account = await Account.findOne({
    userId: req.body.userId,
  }).session(session);

  if (!account) {
    await session.abortTransaction();
    res.json({
      msg: "From Account not found",
    });
  }
  if (account.balance < amount) {
    await session.abortTransaction();
    res.json({
      msg: "Insufficient Balance",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    res.status(400).json({
      msg: "To Account not found",
    });
  }

  await Account.updateOne(
    {
      userId: req.body.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);
  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: +amount,
      },
    }
  ).session(session);

  await session.commitTransaction();
  res.status(200).json({
    msg: "Transfer Complete",
  });
});
module.exports = accountRouter;
