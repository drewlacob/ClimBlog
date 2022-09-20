const express = require("express");
const router = express.Router();
const mys3 = require("../utils/s3");
const crypto = require("crypto");
const multer = require("multer");
const { knex } = require("../utils/knex");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

router.post("/createPost", upload.single("image"), async (req, res) => {
  //req: { title, date, first_name, description, grade, rating, user_id, imageURL }, autofilled: post_id, created_at
  const imageName = randomImageName();
  await mys3.uploadFile(req.file.buffer, imageName, req.file.mimetype);

  knex("posts")
    .insert(
      {
        title: req.body.title,
        date: req.body.date,
        first_name: req.body.first_name,
        description: req.body.description,
        grade: req.body.grade,
        rating: req.body.rating,
        user_id: req.body.user_id,
        image_url: imageName,
      },
      ["post_id", "title", "date", "first_name", "description", "grade", "rating", "image_url", "user_id"]
    )
    .then((post) => res.status(200).json(post[0]))
    .catch((err) => res.status(500).json(err));
});

router.post("/updatePost", upload.single("image"), async (req, res) => {
  //req: { title, date, first_name, description, grade, rating, user_id, imageURL, post_id }
  //todo:
  //make this work

  //retrieve the current version of the post from the db
  const post = await knex("posts").where({ post_id: req.body.post_id }).select("*");
  if (!post[0]) return res.status(404).send("Post not found");

  var imageName;

  //if new image,  delete old image
  if (req.file) {
    await mys3.deleteFile(post[0].image_url);
    //upload new image
    imageName = randomImageName();
    await mys3.uploadFile(req.file.buffer, imageName, req.file.mimetype);
  } else {
    //else set image name back to previous
    imageName = post[0].image_url;
  }
  //update in db
  knex("posts")
    .where({ post_id: req.body.post_id })
    .update(
      {
        title: req.body.title,
        date: req.body.date,
        first_name: req.body.first_name,
        description: req.body.description,
        grade: req.body.grade,
        rating: req.body.rating,
        image_url: imageName,
      },
      ["post_id", "title", "date", "first_name", "description", "grade", "rating", "image_url", "user_id"]
    )
    .then((post) => res.status(200).json(post[0]))
    .catch((err) => res.status(500).json(err));
});

router.get("/getAllPosts", async (req, res) => {
  try {
    const posts = await knex("posts").select("*");
    for (let post of posts) {
      post.signedImageUrl = await mys3.getObjectSignedUrl(post.image_url);
    }

    res.send(posts);
  } catch {
    res.sendStatus(500);
  }
});

router.get("/getAllPostsByUserID/:id", async (req, res) => {
  try {
    const posts = await knex("posts").where({ user_id: req.params.id }).select("*");
    for (let post of posts) {
      post.signedImageUrl = await mys3.getObjectSignedUrl(post.image_url);
    }

    res.send(posts);
  } catch {
    res.sendStatus(500);
  }
});

router.get("/post/:id", async (req, res) => {
  const post = await knex("posts").where({ post_id: req.params.id }).select("*");
  if (!post[0]) return res.status(404).send("Post not found");
  post[0].signedImageUrl = await mys3.getObjectSignedUrl(post[0].image_url);
  res.send(post[0]);
});

router.delete("/post/:id", async (req, res) => {
  const id = +req.params.id;

  const post = await knex("posts").where({ post_id: id }).select("*");
  if (!post[0]) return res.status(404).send("Post not found");

  await mys3.deleteFile(post[0].image_url);

  await knex("posts").where({ post_id: id }).del();
  res.sendStatus(200);
});

module.exports = router;
