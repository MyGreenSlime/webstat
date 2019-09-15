const express = require("express");
const router = express.Router();

const MessageHandle = require("../middleware/message");
const Distributions = require("../model/distribution");

const passport = require("passport");
const permission = require("../middleware/permission");

router.get("/", permission.isAdmin, async (req, res) => {
  try {
    let distributions = await Distributions.find({}, "name parameters");
    res
      .status(200)
      .send(
        MessageHandle.ResponseText("Find All Distributions", distributions)
      );
  } catch (err) {
    res.status(500).send(MessageHandle.ResponseText("error", err));
  }
});
router.get("/:name", permission.isAdmin, async (req, res) => {
  try {
    const namedistribution = req.params.name.toLowerCase();
    let distribution = await Distributions.findOne(
      {
        name: namedistribution
      },
      "name parameters"
    );
    if (distribution) {
      res
        .status(200)
        .send(
          MessageHandle.ResponseText("Find One Distribution", distribution)
        );
    } else {
      res
        .status(404)
        .send(MessageHandle.ResponseText("Find Not Found Distribution"));
    }
  } catch (err) {
    res.status(500).send(MessageHandle.ResponseText("error", err));
  }
});
router.post("/create", permission.isAdmin, async (req, res) => {
  try {
    const data = req.body;
    let distribution = await Distributions.findOne(
      {
        name: data.name.toLowerCase()
      },
      "name parameters"
    );
    if (distribution) {
      res
        .status(200)
        .send(
          MessageHandle.ResponseText(
            "This distribution does exist",
            distribution
          )
        );
    } else {
      let newDistribution = await Distributions.create({
        name: data.name.toLowerCase(),
        parameters: data.parameters
      });
      res
        .status(200)
        .send(MessageHandle.ResponseText("Created", newDistribution));
    }
  } catch (err) {
    res.status(500).send(MessageHandle.ResponseText("error", err));
  }
});
module.exports = router;
