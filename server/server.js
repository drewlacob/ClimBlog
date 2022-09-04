const express = require("express");
const app = express();
const bcrypt = require('bcryptjs')
const config = require('./config.js');
const cors = require('cors');
const { cloudinary } = require('./utils/cloudinary');

app.use(express.json({ limit: '50mb' }));
app.use(cors());

const port = 3000

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
        .catch((err) => res.status(500).json(err));

    //if no user return
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

app.post('/createPost', async (req, res) => {
    //req: { title, date, first_name, description, grade, rating, user_id }, autofilled: post_id, created_at
    const uploadResponse = await cloudinary.uploader.upload(req.body.image, {
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET_NAME,
    });
    console.log(uploadResponse);
    knex('posts')
    .insert(
        {title: req.body.title, 
         date: req.body.date,
         first_name: req.body.first_name,
         description: req.body.description,
         grade: req.body.grade,
         rating: req.body.rating,
         user_id: req.body.user_id,
         image_url: req.body.imageURL},
        ['post_id', 'title', 'date', 'first_name', 'description', 'grade', 'rating', 'image_url', 'user_id']
    )
    .then((user) => res.status(200).json(user[0]))
    .catch((err) => res.status(500).json(err));
})

app.get('/getAllPosts', async (req, res) => {
    knex('posts').select('*')
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(500).json(err));
})

//get one user by id, ex: /post/1
app.get('/post/:id', async (req, res) => {
    knex('posts')
    .where({post_id: req.params.id})
    .select('*')
    .then((post) => res.status(200).json(post[0]))
    .catch((err) => res.status(500).json(err));
})

//lower priority
//get settings
//update settings
//forgot password
//mailer util

app.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET_NAME,
        });
        // console.log(uploadResponse);
        console.log('url:', uploadResponse.url);
        res.status(200).json({imageURL: uploadResponse.url});
    } catch (err) {
        //console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})