const express = require('express')
const router = express.Router()

const MessageHandle = require('../middleware/message')
const Exercises = require('../model/exercise')
const Tasks = require('../model/task')

const permission = require('../middleware/permission')
router.get('/', permission.isLogin , (req, res)=> {
    Tasks.find({
        disable : false
    }, 'nameshow name distribution parameters disable')
    .then(tasks => {
        res.status(200).send(MessageHandle.ResponseText("Find All Tasks", tasks))
    })
    .catch(err => {
        res.status(500).send(MessageHandle.ResponseText("error", err))
    })
})

router.get('/admin/', permission.isAdmin , (req, res)=> {
    Tasks.find({}, 'nameshow name distribution parameters disable')
    .then(tasks => {
        res.status(200).send(MessageHandle.ResponseText("Find All Tasks", tasks))
    })
    .catch(err => {
        res.status(500).send(MessageHandle.ResponseText("error", err))
    })
})

router.get('/:taskid', permission.isLogin, (req, res) => {
    const taskid = req.params.taskid
    Tasks.findOne({
        _id : taskid,
        disable : false
    }, 'nameshow name distribution parameters')
    .then(task => {
        if(task){
            res.status(200).send(MessageHandle.ResponseText("Find One Task", task))
        } else {
            res.status(400).send(MessageHandle.ResponseText("Not Found This Task"))
        }
    })
    .catch(err => {
        res.status(200).send(MessageHandle.ResponseText("error", err))
    })
})

router.get('/admin/:taskid', permission.isAdmin, (req, res) => {
    const taskid = req.params.taskid
    Tasks.findById(taskid, 'nameshow name distribution parameters disable')
    .then(task => {
        if(task){
            res.status(200).send(MessageHandle.ResponseText("Find One Task", task))
        } else {
            res.status(400).send(MessageHandle.ResponseText("Not Found This Task"))
        }
    })
    .catch(err => {
        res.status(200).send(MessageHandle.ResponseText("error", err))
    })
})

router.post('/create', permission.isAdmin, (req, res)=> {
    const data = req.body
    Tasks.findOne({
        name : data.name
    })
    .then(task => {
        if(task){
            res.status(200).send(MessageHandle.ResponseText("This Task does exist", task))
        }
        else{
            Tasks.create(data).
            then(newTask => {
                res.status(200).send(MessageHandle.ResponseText("created", newTask))
            })
            .catch(err => {
                res.status(500).send(MessageHandle.ResponseText("error", err))
            })
        }
    })
    .catch(err => {
        res.status(500).send(MessageHandle.ResponseText("error", err))
    })
})


module.exports = router
