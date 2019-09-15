const express = require("express");
const router = express.Router();

const MessageHandle = require("../middleware/message");
const Exercises = require("../model/exercise");
const Tasks = require("../model/task");
const Users = require("../model/user");
const Results = require("../model/result");

const permission = require("../middleware/permission");

const BasicStat = require("../middleware/basicstat");

router.post("/create", permission.isLogin, async (req, res) => {
  try {
    let data = req.body;
    data.distribution = data.distribution.toLowerCase();
    let summary = {
      mean: BasicStat.FindMean(new Array(...data.data)),
      median: BasicStat.FindMedian(new Array(...data.data)),
      mode: BasicStat.FindMode(new Array(...data.data)),
      variance: BasicStat.FindVariance(new Array(...data.data)),
      sd: BasicStat.FindSD(new Array(...data.data)),
      cumulative: BasicStat.FindCumulative(new Array(...data.data))
    }
    let result =  await Results.findOne({
      exercisename: data.exercisename,
      username: data.username
    })
    if(!result){
      let newResult = await Results.create({
        exercisename: data.exercisename,
        taskname: data.taskname,
        username: data.username,
        distribution: data.distribution,
        data: data.data,
        summary: summary
      })
      res.status(200).send(MessageHandle.ResponseText("created", newResult));
    } else {
      let editResult = await Results.updateOne(
        {
          exercisename: data.exercisename
        },
        {
          $set: {
            taskname: data.taskname,
            data: data.data,
            summary: summary
          }
        }
      )
      result.taskname = data.taskname;
      result.data = data.data;
      result.summary = summary;
      res.status(200).send(MessageHandle.ResponseText("updateResult", result))
    }
  } catch (err) {
    res.status(500).send(MessageHandle.ResponseText("error", err));
  }
});

router.get("/search", permission.isAdmin, async(req, res) => {
  try {
    let query = req.query;
    let results = await Results.find(query)
    .populate({ path: "exercisedetail", select: "title name section disable" })
    .populate({ path: "taskdetail", select: "title name parameters" })
    .populate({ path: "userdetail", select: "username fullname section admin" })
    res.status(200).send(MessageHandle.ResponseText("Find Result By Query", results));
  } catch(err) {
    res.status(500).send(MessageHandle.ResponseText("error", err));
  }
});
router.get("/:taskid", permission.isAdmin, (req, res) => {
  Results.find()
    .populate({ path: "exercisedetail", select: "title name section disable" })
    .populate({
      path: "taskdetail",
      select: "title name parameters",
      match: { _id: req.params.taskid }
    })
    .populate({ path: "userdetail", select: "username fullname section admin" })
    .then(results => {
      results = results.filter(value => {
        return value.taskdetail != null;
      });
      res
        .status(200)
        .send(MessageHandle.ResponseText("Find Result By TaskID", results));
    })
    .catch(err => {
      res.status(500).send(MessageHandle.ResponseText("error", err));
    });
});
router.get("/findone/:resultid", permission.isAdmin, (req, res) => {
  Results.findById(req.params.resultid)
    .populate({ path: "exercisedetail", select: "title name section disable" })
    .populate({ path: "taskdetail", select: "title name parameters" })
    .populate({ path: "userdetail", select: "username fullname section admin" })
    .then(results => {
      res
        .status(200)
        .send(MessageHandle.ResponseText("Find Result By ResultID", results));
    })
    .catch(err => {
      res.status(500).send(MessageHandle.ResponseText("error", err));
    });
});

router.delete("/:resultid", permission.isAdmin, (req, res) => {
  Results.deleteOne({
    _id: req.params.resultid
  })
    .then(delResult => {
      res
        .status(200)
        .send(
          MessageHandle.ResponseText("Delete Result By ResultID", delResult)
        );
    })
    .catch(err => {
      res.status(500).send(MessageHandle.ResponseText("error", err));
    });
});

module.exports = router;
