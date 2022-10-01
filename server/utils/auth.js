const { waitForBucketNotExists } = require("@aws-sdk/client-s3");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = {
  authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    token = authHeader && authHeader.split(" ")[1];
    // const cookie = req.cookies.token;
    token = req.headers.cookie && req.headers.cookie.split("=")[1];
    // console.log(req.headers.cookie);

    //finally got it working
    //todo: deal with when access token is expired, gen new token if refresh token
    //send refresh token along?
    //otherwise seems tow ork until access token expires
    console.log("token:", token);
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
