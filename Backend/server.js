const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const uuid = require("uuid/v4");
const MongoConfig = require("./config/database");
const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, "client/")));

mongoose.connect(
  "mongodb://" +
    MongoConfig.MONGO_URL +
    ":" +
    MongoConfig.MONGO_PORT +
    "/webstat",
  {
    useNewUrlParser: true,
    auth: { authSource: "admin" },
    user: "root",
    pass: "webstat",
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(MongoConfig.MONGO_URL, MongoConfig.MONGO_PORT);
  console.log("connect database");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("catcat"));

app.use(
  session({
    genid: (req) => {
      console.log("Inside the session middleware");
      console.log(req.sessionID);
      return uuid(); // use UUIDs for session IDs
    },
    store: new MongoStore({ mongooseConnection: db }),
    secret: "catcat",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 3,
    },
  })
);
require("./config/passport")(passport);

app.use(passport.initialize());
app.use(passport.session());

// // router
const UserApi = require("./router/users");
const DistributionsApi = require("./router/distributions");
const ExerciseApi = require("./router/exercises");
const TaskApi = require("./router/tasks");
const ResultApi = require("./router/results");
app.use("/api/users", UserApi);
app.use("/api/distributions", DistributionsApi);
app.use("/api/exercises", ExerciseApi);
app.use("/api/tasks", TaskApi);
app.use("/api/results", ResultApi);

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  next();
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/index.html"));
});

app.listen(port, () => {
  console.log("server listening on port :", port);
});
