const express = require('express')
const router = express.Router()

const MessageHandle = require('../middleware/message')
const Exercises = require('../model/exercise')
const Tasks = require('../model/task')

const permission = require('../middleware/permission')

router.get("/", permission.isLogin, (req, res) => {
    Exercises.find({
        section : req.user.section.toLowerCase(),
        disable : false
    }, 'nameshow name tasks section')
    .then(exercises => {
        res.status(200).send(MessageHandle.ResponseText("Find All Exercise", exercises))
    })
    .catch(err => {
        res.status(500).send(MessageHandle.ResponseText("error", err))
    })
})

router.get("/admin", permission.isAdmin, (req, res) => {
    Exercises.find({}, 'nameshow name section tasks disable')
    .then(exercises => {
        res.status(200).send(MessageHandle.ResponseText("Find All Exercise", exercises))
    })
    .catch(err => {
        res.status(500).send(MessageHandle.ResponseText("error", err))
    })
})

router.get('/admin/:exerciseid', permission.isAdmin, (req, res) => {
    Exercises.findById(req.params.exerciseid, 'nameshow name section tasks disable')
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
})

router.put('/admin/edit/:exerciseid', permission.isAdmin, (req, res) => {
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

router.post("/admin/create", permission.isAdmin, (req,res) => {
    const data = req.body
    Exercises.create({
        nameshow : data.nameshow,
        name : data.name,
        section : data.section.toLowerCase(),
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