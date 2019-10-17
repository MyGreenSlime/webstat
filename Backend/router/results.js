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
    let summary = {}
    if(typeof(data.data[0]) == 'number'){
      summary = {
        mean: BasicStat.FindMean(new Array(...data.data)),
        median: BasicStat.FindMedian(new Array(...data.data)),
        mode:  BasicStat.FindMode(new Array(...data.data)),
        maxValue : Number(parseFloat(Math.max(...data.data)).toFixed(4)),
        minValue : Number(parseFloat(Math.min(...data.data)).toFixed(4)),
        variance:  BasicStat.FindVariance(new Array(...data.data)),
        sd: BasicStat.FindSD(new Array(...data.data)),
        cumulative:  BasicStat.FindCumulative(new Array(...data.data)), 
        count : (new Array(...data.data)).length
      }
    } else {
      summary = {
        mean: [BasicStat.FindMean(new Array(...data.data[0])),BasicStat.FindMean(new Array(...data.data[1]))],
        median: [BasicStat.FindMedian(new Array(...data.data[0])),BasicStat.FindMedian(new Array(...data.data[1]))],
        mode:  [BasicStat.FindMode(new Array(...data.data[0])),BasicStat.FindMode(new Array(...data.data[1]))],
        maxValue : [Number(parseFloat(Math.max(...data.data[0])).toFixed(4)),Number(parseFloat(Math.max(...data.data[1])).toFixed(4))],
        minValue : [Number(parseFloat(Math.min(...data.data[0])).toFixed(4)),Number(parseFloat(Math.min(...data.data[1])).toFixed(4))],
        variance:  [BasicStat.FindVariance(new Array(...data.data[0])),BasicStat.FindVariance(new Array(...data.data[1]))],
        sd: [BasicStat.FindSD(new Array(...data.data[0])),BasicStat.FindSD(new Array(...data.data[1]))],
        cumulative:  [BasicStat.FindCumulative(new Array(...data.data[0])),BasicStat.FindCumulative(new Array(...data.data[1]))], 
        count : (new Array(...data.data[0])).length
      }
    }
   
    let result =  await Results.findOne({
      exerciseName: data.exerciseName,
      taskName: data.taskName,
      username: req.user.username
    })
    if(!result){
      let newResult = await Results.create({
        exerciseName: data.exerciseName,
        taskName: data.taskName,
        username: req.user.username,
        distribution: data.distribution,
        data: data.data,
        summary: summary
      })
      res.status(200).send(MessageHandle.ResponseText("created", newResult));
    } else {
      let editResult = await Results.updateOne(
        {
          exerciseName: data.exerciseName,
          taskName: data.taskName
          username: req.user.username
        },
        {
          $set: {
            username: req.user.username,
            data: data.data,
            summary: summary,
            timeStamp : Date.now()
          }
        }
      )
      result.taskName = data.taskName;
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
    .populate({ path: "exerciseDetail", select: "title name section disable" })
    .populate({ path: "taskDetail", select: "title name parameters" })
    .populate({ path: "userDetail", select: "username fullName section admin" })
    res.status(200).send(MessageHandle.ResponseText("Find Result By Query", results));
  } catch(err) {
    res.status(500).send(MessageHandle.ResponseText("error", err));
  }
});
router.get("/:taskid", permission.isAdmin, async (req, res) => {
  try {
    let results = await Results.find()
    .populate({ path: "exerciseDetail", select: "title name section disable" })
    .populate({
      path: "taskDetail",
      select: "title name parameters",
      match: { _id: req.params.taskid }
    })
    .populate({ path: "userDetail", select: "username fullName section admin" })
    results = await results.filter(value => {
      return value.taskdetail != null;
    });
    res.status(200).send(MessageHandle.ResponseText("Find Result By TaskID", results));
    
  } catch(err) {
    res.status(500).send(MessageHandle.ResponseText("error", err));
  }
});
router.get("/findone/:resultid", permission.isAdmin, async (req, res) => {
  try {
    let result = await Results.findById(req.params.resultid)
    .populate({ path: "exerciseDetail", select: "title name section disable" })
    .populate({ path: "taskDetail", select: "title name parameters" })
    .populate({ path: "userDetail", select: "username fullName section admin" })
    res.status(200).send(MessageHandle.ResponseText("Find Result By ResultID", result));
  } catch(err) {
    res.status(500).send(MessageHandle.ResponseText("error", err));
  }
});

router.delete("/:resultid", permission.isAdmin, async (req, res) => {
  try {
    let delResult = await Results.deleteOne({
      _id: req.params.resultid
    })
    res.status(200).send(MessageHandle.ResponseText("Delete Result By ResultID", delResult));
  } catch(err) {
    res.status(500).send(MessageHandle.ResponseText("error", err));
  }
});

module.exports = router;
