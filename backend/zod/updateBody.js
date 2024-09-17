const zod = require("zod");

const updateBody = zod.object({
  password: zod.string().min(6).optional(),
  firstName: zod.string().max(32).optional(),
  lastName: zod.string().max(32).optional(),
});

module.exports = updateBody;
