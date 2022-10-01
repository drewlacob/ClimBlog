const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { knex } = require("../utils/knex");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { authenticateToken, generateAccessToken } = require("../utils/auth");

let refreshTokens = [];

router.post("/login", async (req, res) => {
  //req = { email, password }
  console.log("hit login backend");
  const user = await knex("users")
    .where({ email: req.body.email })
    .select("*")
    .catch((err) => {
      return res.status(500).json(err);
    });

  if (!user[0]) return res.status(401).json({ err: "Invalid credentials" });

  if (bcrypt.compareSync(req.body.password, user[0].password)) {
    // console.log("secret", config.JWT_ACCESS_TOKEN_SECRET);
    // console.log("user[0]", user[0]);
    const accessToken = generateAccessToken(user[0]);
    console.log("setting cookie");
    // res.cookie("token", accessToken, { httpOnly: true });
    const refreshToken = jwt.sign(user[0], config.JWT_REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    // return res.json({ accessToken: accessToken, refreshToken: refreshToken });
    user[0].accessToken = accessToken;
    user[0].refreshToken = refreshToken; //TODO: set refresh token as cookie? or where?
    res.cookie("token", accessToken);
    return res.status(200).json(user[0]);
  } else return res.status(401).json({ err: "Invalid credentials" });
});

router.post("/createAccount", async (req, res) => {
  //req = { email, password }
  let hashed = bcrypt.hashSync(req.body.password, 8);
  knex("users")
    .insert({ email: req.body.email, password: hashed, username: req.body.username }, [
      "user_id",
      "email",
      "password",
      "username",
    ])
    .then((user) => res.status(200).json(user[0]))
    .catch((err) => {
      if (err.code === "23505") return res.status(401).json({ error: "Email or username already in use!" });
      res.status(500).json(err);
    });
});

router.post("/getUserProfile", authenticateToken, async (req, res) => {
  //req = jwt, { user_id }
  knex("users")
    .where({ user_id: req.body.user_id })
    .select("*")
    .then((user) => res.status(200).json(user[0]))
    .catch((err) => res.status(500).json(err));
});

router.post("/updateUserProfile", async (req, res) => {
  //req = jwt, { user_id, first_name, last_name, email, password }
  let hashed;
  if (req.body.password) hashed = bcrypt.hashSync(req.body.password, 8);
  knex("users")
    .where({ user_id: req.body.user_id })
    .update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashed,
      },
      ["user_id", "first_name", "last_name", "email", "password"]
    )
    .then((user) => res.status(200).json(user[0]))
    .catch((err) => res.status(500).json(err));
});

router.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, config.JWT_REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ user });
    res.json({ accessToken: accessToken });
  });
});

router.delete("/logout", (req, res) => {
  console.log("before delete", refreshTokens);
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  console.log("after", refreshTokens);
  res.sendStatus(204);
});

module.exports = router;
