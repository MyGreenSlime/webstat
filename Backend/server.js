const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require('passport');
const uuid = require('uuid/v4')

const {sequelize} =require('./model/sequelize')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('catcat'));

app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  store : new SequelizeStore({
    db : sequelize,
    checkExpirationInterval: 15 * 60 * 1000
  }),
  secret: 'catcat',
  resave: true,
  saveUninitialized: true,
  rolling : true,
  cookie : {
    httpOnly : true,
    maxAge : 1000 * 60 * 60 * 3
  }
}));
require('./config/passport')(passport)

app.use(passport.initialize());
app.use(passport.session());

// router
const UserApi = require("./router/users");
app.use("/api/users", UserApi);

app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  next();
});

app.listen(port, () => {
  console.log("server listening on port :", port);
});
