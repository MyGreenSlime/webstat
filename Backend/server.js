const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const Imap = require('imap')
const inspect = require('util').inspect;
const {Users , Admins} = require('./model/sequelize')
const cookieChecker = require('./cookies/cookies')
const axios = require('axios')

const app = express()
const port = 3001

var imap = new Imap({
  user: 'b5910503821',
  password: '@Greenslime24',
  host: 'imap.ku.ac.th',
  port: 993,
  authTimeout : 3000,
  tls : true,
  tlsOptions : {
    rejectUnauthorized: false
  }
}) 

imap.connect()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    next();
  });

app.post("/register", (req,res) => {
  const data = req.body
  Users.findOne({
    where : {
      username : data.username
    },
    attributes: ['id', ['username']]
  })
  .then(user => {
    if(user === null){
      Users.create(data)
      .then(() => {
        res.status(200).send("created")
      })
      .catch(err => {
        console.log(err)
        res.status(500).send(err)
      })
    } else [
      res.status(200).send("user exist")
    ]
  })
  .catch(err => {
    console.log(err)
    res.status(500).send(err)
  })
})

app.listen(port,()=>{
    console.log("server listening on port :", port)
})