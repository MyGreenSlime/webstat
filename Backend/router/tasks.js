const express = require('express')
const router = express.Router()

const MessageHandle = require('../middleware/message')
const Exercises = require('../model/exercise')
const Tasks = require('../model/task')

const permission = require('../middleware/permission')
router.get('/', permission.isLogin , (req, res)=> {
    if(!req.user.admin){
        Tasks.find({
            disable : false
        }, 'title name distribution genamount parameters')
        .populate('distribution')
        .then(tasks => {
            res.status(200).send(MessageHandle.ResponseText("Find All Tasks", tasks))
        })
        .catch(err => {
            res.status(500).send(MessageHandle.ResponseText("error", err))
        })
    } else {
        Tasks.find({}, 'title name distribution genamount parameters disable')
        .populate('distribution')
        .then(tasks => {
            res.status(200).send(MessageHandle.ResponseText("Find All Tasks", tasks))
        })
        .catch(err => {
            res.status(500).send(MessageHandle.ResponseText("error", err))
        })
    }
})

router.get('/:taskid', permission.isLogin, (req, res) => {
    const taskid = req.params.taskid
    if(!req.user.admin){
        Tasks.findOne({
            _id : taskid,
            disable : false
        }, 'title name distribution genamount parameters')
        .populate('distribution')
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
    } else {
        Tasks.findById(taskid, 'title name distribution genamount parameters disable')
        .populate('distribution')
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
    }
    
})
router.put('/edit/:taskid', permission.isAdmin, (req, res) => {
    const data = req.body
    console.log(data)
    Tasks.updateOne({
        _id : req.params.taskid
    }, {
        $set : data
    })
    .then(editedTask => {
        res.status(200).send(MessageHandle.ResponseText("edited", editedTask))
    })
    .catch(err => {
        res.status(500).send(MessageHandle.ResponseText("error", err))
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

router.delete('/delete/:taskid', permission.isAdmin, (req, res) => {
    Exercises.updateMany({
        'tasks.taskid' : req.params.taskid
    }, { $pull : {
        tasks : {
            taskid : req.params.taskid
        }
    }})
    .then(editExercise => {
        // res.status(200).send(MessageHandle.ResponseText("clear task in all Exercises", editExercise))
        Tasks.deleteOne({
            _id : req.params.taskid
        })
        .then(delTask => {
            res.status(200).send(MessageHandle.ResponseText("clear task in all Exercises", delTask))
        })
        .catch(err => {
            res.status(500).send(MessageHandle.ResponseText('error', err))
        })
    })
    .catch(err => {
        res.status(500).send(MessageHandle.ResponseText('error', err))
    })
})

module.exports = router
