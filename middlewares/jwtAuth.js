const jwt = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      const err = new Error("Authorization Failed!");
      err.statusCode = 401;
      throw err;
    }

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.id, name: payload.name };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = jwtAuth;
