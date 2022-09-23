const { waitForBucketNotExists } = require("@aws-sdk/client-s3");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = {
  authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, config.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  },

  generateAccessToken(user) {
    return jwt.sign(user, config.JWT_ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
  },
};
