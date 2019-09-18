const express = require("express");
const router = express.Router();

const MessageHandle = require("../middleware/message");
const Exercises = require("../model/exercise");
const Tasks = require("../model/task");
const Results = require("../model/result")

const permission = require("../middleware/permission");

router.get("/", permission.isLogin, async (req, res) => {
  if (!req.user.admin) {
    try {
      let exercises = await Exercises.find(
        {
          section: req.user.section.toLowerCase(),
          disable: false
        },
        "title name description tasks section"
      ).populate({
        path: "tasks",
        match : {disable : false},
        model: "Tasks",
        populate: {
          path: "distribution",
          model: "Distributions"
        }
      });
      res
        .status(200)
        .send(MessageHandle.ResponseText("Find All Exercise", exercises));
    } catch (err) {
      res.status(500).send(MessageHandle.ResponseText("error", err));
    }
  } else {
    try {
      let exercises = await Exercises.find(
        {},
        "title name description section tasks disable"
      ).populate({
        path: "tasks",
        model: "Tasks",
        populate: {
          path: "distribution",
          model: "Distributions"
        }
      });
      res
        .status(200)
        .send(MessageHandle.ResponseText("Find All Exercise", exercises));
    } catch (err) {
      res.status(500).send(MessageHandle.ResponseText("error", err));
    }
  }
});

router.get("/:exerciseid", permission.isLogin, async (req, res) => {
  if (!req.user.admin) {
    try {
      let exercise = await Exercises.findOne(
        {
          _id: req.params.exerciseid,
          disable: false
        },
        "title name description section tasks"
      ).populate({
        path: "tasks",
        model: "Tasks",
        populate: {
          path: "distribution",
          model: "Distributions"
        }
      });
      if (exercise) {
        res
          .status(200)
          .send(MessageHandle.ResponseText("Find One Exercise", exercise));
      } else {
        res
          .status(404)
          .send(MessageHandle.ResponseText("Not Found This Exercise"));
      }
    } catch (err) {
      res.status(500).send(MessageHandle.ResponseText("error", err));
    }
  } else {
    try {
      let exercise = await Exercises.findOne(
        {
          _id: req.params.exerciseid
        },
        "title name description section tasks disable"
      ).populate({
        path: "tasks",
        model: "Tasks",
        populate: {
          path: "distribution",
          model: "Distributions"
        }
      });
      if (exercise) {
        res
          .status(200)
          .send(MessageHandle.ResponseText("Find One Exercise", exercise));
      } else {
        res
          .status(404)
          .send(MessageHandle.ResponseText("Not Found This Exercise"));
      }
    } catch (err) {
      res.status(500).send(MessageHandle.ResponseText("error", err));
    }
  }
});

router.put("/edit/:exerciseid", permission.isAdmin, async (req, res) => {
  try {
    const data = req.body;
    let editedExercise = await Exercises.updateOne(
      {
        _id: req.params.exerciseid
      },
      { $set: data }
    );
    res.status(200).send(MessageHandle.ResponseText("edited", editedExercise));
  } catch (err) {
    res.status(500).send(MessageHandle.ResponseText("error", err));
  }
});

router.put("/addtask/:exerciseid", permission.isAdmin, async (req, res) => {
  try {
    const data = req.body;
    let editedExercise = await Exercises.updateOne(
      {
        _id: req.params.exerciseid
      },
      {
        $push: {
          tasks: {
            $each: data.tasks
          }
        }
      }
    );
    res.status(200).send(MessageHandle.ResponseText("edited", editedExercise));
  } catch (err) {
    res.status(500).send(MessageHandle.ResponseText("error", err));
  }
});

router.put("/removetask/:exerciseid", permission.isAdmin, async (req, res) => {
  try {
    const data = req.body;
    let editedExercise = await Exercises.updateOne(
      {
        _id: req.params.exerciseid
      },
      {
        $pull: {
          tasks: {
            taskid: {
              $in: data.tasks
            }
          }
        }
      }
    );
    res.status(200).send(MessageHandle.ResponseText("edited", editedExercise));
  } catch (err) {
    res.status(500).send(MessageHandle.ResponseText("error", err));
  }
});

router.post("/create", permission.isAdmin, async (req, res) => {
  try {
    const data = req.body;
    let exercise = await Exercises.findOne({
      name : data.name
    })
    if(!exercise){
      let newExercise = await Exercises.create({
        title: data.title,
        name: data.name,
        description: data.description,
        section: data.section.toLowerCase(),
        tasks: data.tasks,
        disable: data.disable
      });
      res.status(200).send(MessageHandle.ResponseText("created", newExercise));
    } else {
      res.status(200).send(MessageHandle.ResponseText("Exercise does exist", exercise));
    }
    
  } catch (err) {
    res.status(500).send(MessageHandle.ResponseText("error", err));
  }
});

router.delete('/:exerciseid', permission.isAdmin, async (req, res) => {
  try{
    let exercise = await Exercises.findById(req.params.exerciseid)
    // await Results.deleteMany({
    //   exerciseName : exercise.name
    // })
    let delExercise = await Exercises.deleteOne({
      _id : req.params.exerciseid
    })
    res.status(200).send(MessageHandle.ResponseText("Delete Exercise", delExercise));
  } catch(err) {
    res.status(500).send(MessageHandle.ResponseText("error", err));
  }
})

module.exports = router;
