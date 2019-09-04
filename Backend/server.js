const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const mongoose = require("mongoose")
const MongoStore = require('connect-mongo')(session);

const passport = require('passport');
const uuid = require('uuid/v4')

const app = express();
const port = 3001;


mongoose.connect('mongodb://localhost:27018/webstat', {
  useNewUrlParser: true,
  "auth": { "authSource": "admin" },
    "user": "root",
    "pass": "webstat",
  })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connect database")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('catcat'));

app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  store : new MongoStore({ mongooseConnection: db }),
  secret: 'catcat',
  resave: true,
  saveUninitialized: true,
  rolling : true,
  cookie : {
    httpOnly : false,
    maxAge : 1000 * 60 * 60 * 3
  }
}));
require('./config/passport')(passport)

app.use(passport.initialize());
app.use(passport.session());

// // router
const UserApi = require("./router/users");
const DistributionsApi = require("./router/distributions")
const ExerciseApi = require('./router/exercises')
app.use("/api/users", UserApi);
app.use("/api/distributions", DistributionsApi);
app.use("/api/exercises",ExerciseApi)


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
