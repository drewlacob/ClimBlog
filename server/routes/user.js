const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { knex } = require("../utils/knex");

router.post("/login", async (req, res) => {
  //req = { email, password }
  const user = await knex("users")
    .where({ email: req.body.email })
    .select("*")
    .catch((err) => {
      return res.status(500).json(err);
    });

  if (!user[0]) return res.status(401).json({ err: "Invalid credentials" });

  if (bcrypt.compareSync(req.body.password, user[0].password)) res.status(200).json(user[0]);
  else res.status(401).json({ err: "Invalid credentials" });
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

router.post("/getUserProfile", async (req, res) => {
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

module.exports = router;
