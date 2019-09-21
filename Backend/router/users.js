const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const MessageHandle = require("../middleware/message");
const Users = require("../model/user");

const passport = require("passport");
const permission = require("../middleware/permission");

router.post("/register", async (req, res) => {
  const data = req.body;
  try {
    let user = await Users.findOne({
      username: data.username.toLowerCase()
    });
    if (user == null) {
      let newuser = await Users.create({
        username: data.username.toLowerCase(),
        fullName: data.fullName,
        section: data.section.toLowerCase(),
        admin: data.admin
      });
      res.status(200).send(MessageHandle.ResponseText("created", newuser));
    } else {
      res
        .status(200)
        .send(MessageHandle.ResponseText("username does exist", user.get));
    }
  } catch (err) {
    res.status(500).send(MessageHandle.ResponseText("error", err));
  }
});

router.post("/login", async (req, res, next) => {
  await passport.authenticate("user", (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .send(MessageHandle.ResponseText("Login Failed", err));
    }
    if (!user) {
      return res
        .status(500)
        .send(MessageHandle.ResponseText("Login Failed", info));
    }
    req.logIn(user, function(err) {
      if (err) {
        return res
          .status(500)
          .send(MessageHandle.ResponseText("Login Failed", err));
      }
      return res
        .status(200)
        .send(
          MessageHandle.ResponseText("Login Succeed", {
            user: user,
            sessionExpire: req.session["cookie"]["expires"]
          })
        );
    });
  })(req, res, next);
});

router.get("/profile", permission.isLogin, (req, res) => {
  res.status(200).send(req.user);
});

router.post("/logout", permission.isLogin, (req, res) => {
  req.logout();
  res.status(200).send(MessageHandle.ResponseText("Logout succeed"));
});

module.exports = router;
