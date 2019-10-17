const express = require("express");
const router = express.Router();

const MessageHandle = require("../middleware/message");
const Exercises = require("../model/exercise");
const Tasks = require("../model/task");
const Results = require("../model/result");

const permission = require("../middleware/permission");
router.get("/", permission.isLogin, async (req, res) => {
  if (!req.user.admin) {
    try {
      let tasks = await Tasks.find(
        {
          disable: false
        },
        "title name distribution genAmount parameters"
      ).populate("distribution");
      res.status(200).send(MessageHandle.ResponseText("Find All Tasks", tasks));
    } catch (err) {
      res.status(500).send(MessageHandle.ResponseText("error", err));
    }
  } else {
    try {
      let tasks = await Tasks.find(
        {},
        "title name distribution genAmount parameters disable"
      ).populate("distribution");
      res.status(200).send(MessageHandle.ResponseText("Find All Tasks", tasks));
    } catch (err) {
      res.status(500).send(MessageHandle.ResponseText("error", err));
    }
  }
});

router.get("/:taskid", permission.isLogin, async (req, res) => {
  const taskid = req.params.taskid;
  if (!req.user.admin) {
    try {
      let task = await Tasks.findOne(
        {
          _id: taskid,
          disable: false
        },
        "title name distribution genAmount parameters"
      ).populate("distribution");
      if (task) {
        res.status(200).send(MessageHandle.ResponseText("Find One Task", task));
      } else {
        res.status(400).send(MessageHandle.ResponseText("Not Found This Task"));
      }
    } catch (err) {
      res.status(200).send(MessageHandle.ResponseText("error", err));
    }
  } else {
    try {
      let task = await Tasks.findById(
        taskid,
        "title name distribution genAmount parameters disable"
      ).populate("distribution");
      if (task) {
        res.status(200).send(MessageHandle.ResponseText("Find One Task", task));
      } else {
        res.status(400).send(MessageHandle.ResponseText("Not Found This Task"));
      }
    } catch (err) {
      res.status(200).send(MessageHandle.ResponseText("error", err));
    }
  }
});
router.put("/edit/:taskid", permission.isAdmin, async (req, res) => {
  try {
    const data = req.body;
    let editedTask = await Tasks.updateOne(
      {
        _id: req.params.taskid
      },
      {
        $set: data
      }
    );
    res.status(200).send(MessageHandle.ResponseText("edited", editedTask));
  } catch (err) {
    res.status(500).send(MessageHandle.ResponseText("error", err));
  }
});
router.post("/create", permission.isAdmin, async (req, res) => {
  try {
    const data = req.body;
    let task = await Tasks.findOne({
      name: data.name
    });
    if (task) {
      res.status(200).send(MessageHandle.ResponseText("Task does exist", task));
    } else {
      let newTask = await Tasks.create(data);
      res.status(200).send(MessageHandle.ResponseText("created", newTask));
    }
  } catch (err) {
    res.status(500).send(MessageHandle.ResponseText("error", err));
  }
});

router.delete("/:taskid", permission.isAdmin, async (req, res) => {
  try {
    let task = await Tasks.findById(req.params.taskid);
    // await Results.deleteMany({
    //   taskName: task.name
    // });
    await Exercises.updateMany(
      {
        "tasks.taskid": req.params.taskid
      },
      {
        $pull: {
          tasks: {
            taskid: req.params.taskid
          }
        }
      }
    );
    let delTask = await Tasks.deleteOne({
      _id: req.params.taskid
    });
    res.status(200).send(MessageHandle.ResponseText("delete task", delTask));
  } catch (err) {
    res.status(500).send(MessageHandle.ResponseText("error", err));
  }
});

module.exports = router;
