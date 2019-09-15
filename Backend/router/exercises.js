const express = require('express')
const router = express.Router()

const MessageHandle = require('../middleware/message')
const Exercises = require('../model/exercise')
const Tasks = require('../model/task')

const permission = require('../middleware/permission')

router.get("/", permission.isLogin, (req, res) => {
    if(!req.user.admin){
        Exercises.find({
            section : req.user.section.toLowerCase(),
            disable : false
        }, 'title name description tasks section')
        .populate({
            path : 'tasks',
            model : 'Tasks',
            populate : {
                path : 'distribution',
                model : 'Distributions'
            }
        })
        .then(exercises => {
            res.status(200).send(MessageHandle.ResponseText("Find All Exercise", exercises))
        })
        .catch(err => {
            res.status(500).send(MessageHandle.ResponseText("error", err))
        })
    }
    else {
        Exercises.find({},'title name description section tasks disable')
        .populate({
            path : 'tasks',
            model : 'Tasks',
            populate : {
                path : 'distribution',
                model : 'Distributions'
            }
        })
        .then(exercises => {
            res.status(200).send(MessageHandle.ResponseText("Find All Exercise", exercises))
        })
        .catch(err => {
            res.status(500).send(MessageHandle.ResponseText("error", err))
        })
        }
})


router.get('/:exerciseid', permission.isLogin, (req, res) => {
    if(!req.user.admin){
        Exercises.findOne({
            _id : req.params.exerciseid,
            disable : false
        }, 'title name description section tasks')
        .populate({
            path : 'tasks',
            model : 'Tasks',
            populate : {
                path : 'distribution',
                model : 'Distributions'
            }
        })
        .then(exercise => {
            if(exercise){
                res.status(200).send(MessageHandle.ResponseText('Find One Exercise', exercise))
            } else {
                res.status(404).send(MessageHandle.ResponseText("Not Found This Exercise"))
            }
        })
        .catch(err => {
            res.status(500).send(MessageHandle.ResponseText('error', err))
        })
    }else {
        Exercises.findOne({
            _id : req.params.exerciseid,
        }, 'title name description section tasks disable')
        .populate({
            path : 'tasks',
            model : 'Tasks',
            populate : {
                path : 'distribution',
                model : 'Distributions'
            }
        })
        .then(exercise => {
            if(exercise){
                res.status(200).send(MessageHandle.ResponseText('Find One Exercise', exercise))
            } else {
                res.status(404).send(MessageHandle.ResponseText("Not Found This Exercise"))
            }
        })
        .catch(err => {
            res.status(500).send(MessageHandle.ResponseText('error', err))
        })
    }
    
})

router.put('/edit/:exerciseid', permission.isAdmin, (req, res) => {
    const data = req.body
    Exercises.updateOne({
        _id : req.params.exerciseid
    },{$set : data})
    .then(editedExercise => {
        res.status(200).send(MessageHandle.ResponseText("edited", editedExercise))
    })
    .catch(err => {
        res.status(500).send(MessageHandle.ResponseText("error", err))
    })
})

router.put('/addtask/:exerciseid', permission.isAdmin, (req, res) => {
    const data = req.body
    Exercises.updateOne({
        _id : req.params.exerciseid
    }, {$push : {
        tasks : {
            $each : data.tasks
        }
    }})
    .then(editedExercise => {
        res.status(200).send(MessageHandle.ResponseText("edited", editedExercise))
    })
    .catch(err => {
        res.status(500).send(MessageHandle.ResponseText("error", err))
    })
})

router.put('/removetask/:exerciseid', permission.isAdmin, (req, res) => {
    const data = req.body
    Exercises.updateOne({
        _id : req.params.exerciseid
    }, {$pull : {
        tasks : {
            taskid  : {
                $in : data.tasks
            }
        }
    }})
    .then(editedExercise => {
        res.status(200).send(MessageHandle.ResponseText("edited", editedExercise))
    })
    .catch(err => {
        res.status(500).send(MessageHandle.ResponseText("error", err))
    })
})

router.post("/create", permission.isAdmin, (req,res) => {
    const data = req.body
    Exercises.create({
        title : data.title,
        name : data.name,
        description : data.description,
        section : data.section.toLowerCase(),
        tasks : data.tasks,
        disable : data.disable,
    })
    .then(newExercise => {
        res.status(200).send(MessageHandle.ResponseText("created", newExercise))
    })
    .catch(err => {
        res.status(500).send(MessageHandle.ResponseText("error", err))
    })
})





module.exports = router