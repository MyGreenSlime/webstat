const express = require('express')
const router = express.Router()

const MessageHandle = require('../middleware/message')
const Exercises = require('../model/exercise')
const Tasks = require('../model/task')
const Users = require('../model/user')
const Results = require('../model/result')

const permission = require('../middleware/permission')

const BasicStat = require('../middleware/basicstat')

router.post('/create', permission.isLogin, (req, res) => {
    let data = req.body 
    data.distribution = (data.distribution).toLowerCase()
    let summary = {
        mean : BasicStat.FindMean(new Array(...data.data)),
        median : BasicStat.FindMedian(new Array(...data.data)),
        mode : BasicStat.FindMode(new Array(...data.data)),
        variance : BasicStat.FindVariance(new Array(...data.data)),
        sd : BasicStat.FindSD(new Array(...data.data)),
        cumulative : BasicStat.FindCumulative(new Array(...data.data)) 
    }
    Results.findOne({
        exercisename : data.exercisename,
        username : data.username
    })
    .then(result => {
        if(result){
            Results.updateOne({
                exercisename : data.exercisename
            }, { $set : {
                taskname : data.taskname,
                data : data.data,
                summary : summary
            }})
            .then(editedResult => {
                result.taskname = data.taskname
                result.data = data.data
                result.summary = summary
                res.status(200).send(MessageHandle.ResponseText('updateResult', result))
            })
            .catch(err => {
                res.status(500).send(MessageHandle.ResponseText('error', err))
            })
        } else {
            Results.create({
                exercisename : data.exercisename,
                taskname : data.taskname,
                username : data.username,
                distribution : data.distribution,
                data : data.data,
                summary : summary
            })
            .then(result => {
                res.status(200).send(MessageHandle.ResponseText('created', result))
            })
            .catch(err => {
                res.status(500).send(MessageHandle.ResponseText('error', err))
            })
            
        }
    })
    .catch(err => {
        res.status(500).send(MessageHandle.ResponseText('error', err))
    })
})

router.get('/search', permission.isAdmin ,(req, res)=>{
    let query = req.query
    Results.find(query)
    .populate({path :'exercise', select : 'title name section disable'})
    .populate({path :'task', select :'title name parameters'})
    .populate({path :'user', select :'username fullname section admin'})
    .then(results => {
        res.status(200).send(MessageHandle.ResponseText('Find Result By Query', results))
    })
    .catch(err => {
        res.status(500).send(MessageHandle.ResponseText('error', err))
    })
})
router.get('/:taskid', permission.isAdmin ,(req, res)=>{
    Results.find()
    .populate({path :'exercise', select : 'title name section disable'})
    .populate({path :'task', select :'title name parameters', match : {_id : req.params.taskid}})
    .populate({path :'user', select :'username fullname section admin'})
    .then(results => {
        res.status(200).send(MessageHandle.ResponseText('Find Result By Query', results.filter(value => {
            return value.task != null
        })))
    })
    .catch(err => {
        res.status(500).send(MessageHandle.ResponseText('error', err))
    })
})
module.exports = router