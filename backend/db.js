const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_DB_URL);

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 32,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 32,
  },
});

const User = mongoose.model("User", userSchema);

const bankSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", bankSchema);
module.exports = {
  User,
  Account,
};
