const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Imap = require("imap");
const session = require("express-session");
const cookieChecker = require("./cookies/cookies");
const axios = require("axios");
const app = express();
const port = 3001;

// var imap = new Imap({
//   user: "b5910503821",
//   password: "@Greenslime24",
//   host: "imap.ku.ac.th",
//   port: 993,
//   authTimeout: 3000,
//   tls: true,
//   tlsOptions: {
//     rejectUnauthorized: false
//   }
// });
// // console.log(imap.state)
// // imap.once('ready', function() {
// //   console.log(imap.state)
// //   imap.end()
// // })
// // imap.once('error', function(err){
// //   console.log(imap.state)
// //   imap.end()
// // })
// // imap.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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
