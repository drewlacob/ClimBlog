const express = require("express");
const app = express();
const bcrypt = require('bcryptjs')
const cors = require('cors');
const multer = require('multer');
const crypto = require('crypto');
const config = require('./config.js');
const mys3 = require('./utils/s3');

app.use(express.json({ limit: '50mb' }));
app.use(cors());

const port = 3000

const storage = multer.memoryStorage();
const upload = multer({storage: storage})

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

//https://devhints.io/knex
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : config.dbHost,
      port : 5432,
      user : config.dbUser,
      password : config.dbPassword,
      database : config.dbName
    }
  });
//TODO: ADD JWT TO PROTECT ROUTES
//https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
//TODO: SPLIT THIS FILE INTO ROUTES AND CONTOLLERS TO DECLUTTER

//post so password sent in body and not url, safer
app.post('/login', async (req, res) => {
    //req = { email, password }
    const user = await knex('users')
        .where({email: req.body.email})
        .select('*')
        .catch((err) => {return res.status(500).json(err)});

    if(!user[0]) return res.status(401).json({err: "Invalid credentials"});

    if(bcrypt.compareSync(req.body.password, user[0].password))
        res.status(200).json(user[0]);
    else
        res.status(401).json({err: "Invalid credentials"});
})

app.post('/createAccount', async (req, res) => {
    //req = { email, password }
    let hashed = bcrypt.hashSync(req.body.password, 8);
    knex('users')
        .insert(
            {email: req.body.email, password: hashed},
            ['user_id', 'email', 'password']
        )
        .then((user) => res.status(200).json(user[0]))
        .catch((err) => {
            if(err.code==="23505")
                return res.status(401).json({error: 'Email already exists'})
            res.status(500).json(err)});
})

app.post('/getUserProfile', async (req, res) => {
    //req = jwt, { user_id }
    knex('users')
    .where({ user_id: req.body.user_id })
    .select('*')
    .then((user) => res.status(200).json(user[0]))
    .catch((err) => res.status(500).json(err));
})

app.post('/updateUserProfile', async (req, res) => {
    //req = jwt, { user_id, first_name, last_name, email, password }
    let hashed;
    if(req.body.password)
        hashed = bcrypt.hashSync(req.body.password, 8);
    knex('users')
    .where({ user_id: req.body.user_id })
    .update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashed
    }, ['user_id', 'first_name', 'last_name', 'email', 'password'])
    .then((user) => res.status(200).json(user[0]))
    .catch((err) => res.status(500).json(err));
})

app.post('/createPost', upload.single('image'), async (req, res) => {
    //req: { title, date, first_name, description, grade, rating, user_id, imageURL }, autofilled: post_id, created_at
    const imageName = randomImageName();
    await mys3.uploadFile(req.file.buffer, imageName, req.file.mimetype);

    knex('posts')
    .insert(
        {title: req.body.title, 
         date: req.body.date,
         first_name: req.body.first_name,
         description: req.body.description,
         grade: req.body.grade,
         rating: req.body.rating,
         user_id: req.body.user_id,
         image_url: imageName},
        ['post_id', 'title', 'date', 'first_name', 'description', 'grade', 'rating', 'image_url', 'user_id']
    )
    .then((post) => res.status(200).json(post[0]))
    .catch((err) => res.status(500).json(err));
})

app.get('/getAllPosts', async (req, res) => {
    const posts = await knex('posts').select('*');
    
    for (let post of posts) {
        post.signedImageUrl = await mys3.getObjectSignedUrl(post.image_url);
      }

    res.send(posts);
})

//get request cant pass items in body, change to /:?userID or whatever and use req.params
app.get('/getAllPostsByUserID/:id', async (req, res) => {
    const posts = await knex('posts').where({ user_id: req.params.id }).select('*');
    
    for (let post of posts) {
        post.signedImageUrl = await mys3.getObjectSignedUrl(post.image_url);
      }

    res.send(posts);
})

//get one post by id, ex: /post/1
app.get('/post/:id', async (req, res) => {
    const post = await knex('posts').where({post_id: req.params.id}).select('*')
    if (!post[0])
        return res.status(404).send('Post not found');
    post[0].signedImageUrl = await mys3.getObjectSignedUrl(post[0].image_url);
    res.send(post);
})

app.delete('/post/:id', async (req, res) => {
    const id = +req.params.id;

    const post = await knex('posts').where({post_id: id}).select('*');
    if (!post[0])
        return res.status(404).send('Post not found');

    await mys3.deleteFile(post[0].image_url);

    await knex('posts').where({post_id: id}).del();
    res.sendStatus(200);
})

//lower priority
//get settings
//update settings
//forgot password
//mailer util

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})