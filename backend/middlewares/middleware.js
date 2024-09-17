const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authToken = req.headers.authorization;
  if (!authToken || !authToken.startsWith("Bearer ")) {
    res.status(403).json({
      msg: "Not Signed In",
    });
  }
  const reqToken = authToken.split(" ")[1];

  try {
    const decoded = jwt.verify(reqToken, process.env.JWT_SECRET);

    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    return res.json({
      error: error,
    });
  }
}

module.exports = authMiddleware;
