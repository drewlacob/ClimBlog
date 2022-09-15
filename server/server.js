const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json({ limit: '50mb' }));
app.use(cors());

const port = 3000

//TODO: ADD JWT TO PROTECT ROUTES
//https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs

const userRouter = require('./routes/user');
app.use('/', userRouter);
const postsRouter = require('./routes/posts');
app.use('/', postsRouter);

//lower priority
//get settings
//update settings
//forgot password
//mailer util

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})