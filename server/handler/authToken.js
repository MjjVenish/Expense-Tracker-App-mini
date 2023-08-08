require("dotenv").config();
const jwt = require("jsonwebtoken");

const authencateToken = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

module.exports = authencateToken;
