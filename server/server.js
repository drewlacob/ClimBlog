const express = require("express");
const app = express();
const bcrypt = require('bcryptjs')
const config = require('./config.js');
const cors = require('cors');

app.use(express.json());
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

app.get('/getUserProfile', async (req, res) => {
    //req = jwt, { user_id }
    const user = await knex('users')
    .where({ user_id: req.body.user_id })
    .select('*')
    .then((user) => res.status(200).json(user[0]))
    .catch((err) => res.status(500).json(err));
})

app.post('/updateUserProfile', async (req, res) => {
    //req = jwt, { user_id, first_name, last_name }
    knex('users')
    .where({ user_id: req.body.user_id })
    .update({
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }, ['user_id', 'first_name', 'last_name'])
    .then((user) => res.status(200).json(user[0]))
    .catch((err) => res.status(500).json(err));
})


//create post
//get all posts
//get one post

//lower priority
//get settings
//update settings
//forgot password
//mailer util


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})