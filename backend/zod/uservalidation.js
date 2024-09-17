const zod = require("zod");

const userVerification = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
  firstName: zod.string().max(32),
  lastName: zod.string().max(32, { msg: "Less than 32 letters" }),
});

const userSignin = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

module.exports = { userVerification, userSignin };
