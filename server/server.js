const express = require("express");
const app = express();
const bcrypt = require('bcryptjs')

app.use(express.json());

const port = 3000

//https://devhints.io/knex
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : 'localhost',
      port : 5432,
      user : 'postgres',
      password : 'drew1523',
      database : 'climblog'
    }
  });

//set up db

//routes

app.get('/', (req, res) => {
    res.send('Hello World!')
  })


//sign in
app.get('/login', async (req, res) => {
    //req = { email, password }
    const user = await knex('users')
        .where({email: req.body.email})
        .select('*')
        .catch((err) => res.status(500).json(err));
    
    if(bcrypt.compareSync(req.body.password, user[0].password))
        res.status(200).json(user[0]);
    else
        res.status(400);
})


//create account
app.post('/createAccount', async (req, res) => {
    //req = { email, password }
    let hashed = bcrypt.hashSync(req.body.password, 8);
    knex('users')
        .insert(
            {email: req.body.email, password: hashed},
            ['user_id', 'email', 'password']
        )
        .then((user) => res.status(200).json(user[0]))
        .catch((err) => res.status(500).json(err));
})




//create post
//get all posts
//get one post

//lower priority
//get profile
//get settings
//update profile
//update settings
//forgot password
//mailer util


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})