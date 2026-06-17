const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith(
      "Bearer"
    )
  ) {
    token =
      req.headers.authorization.split(
        " "
      )[1];
  }

  if (!token && req.query.token) {
    token = req.query.token;
  }

  if (!token) {
    return res.status(401).json({
      message: "No Token"
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch {
    res.status(401).json({
      message: "Invalid Token"
    });
  }
};