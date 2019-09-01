const express = require('express')
const router = express.Router()

const MessageHandle = require('../middleware/message')
const Users = require('../model/user')
const Distributions =  require('../model/distribution')

const passport = require('passport')
const permission = require('../middleware/permission')


router.get("/", permission.isAdmin, (req, res) => {
    Distributions.find({},'name parameters')
    .then(distributions => {
        res.status(200).send(MessageHandle.ResponseText("Find All Distributions", distributions))
    })
    .catch(err => {
        res.status(500).send(MessageHandle.ResponseText("error", err))
    })
})
router.get("/:name", permission.isAdmin, (req, res) => {
    const namedistribution = req.params.name.toLowerCase()
    Distributions.findOne({
        name : namedistribution
    }, 'name parameters')
    .then(distribution => {
        if(distribution){
            res.status(200).send(MessageHandle.ResponseText("Find One Distribution", distribution))
        } else {
            res.status(404).send(MessageHandle.ResponseText("Find Not Found Distribution"))
        }
        
    })
    .catch(err => {
        res.status(500).send(MessageHandle.ResponseText("error", err))
    })
})
router.post("/create", permission.isAdmin, (req, res) => {
    const data = req.body
    Distributions.findOne({
        name : data.name.toLowerCase()
    },'name parameters')
    .then(distribution => {
        if(distribution){
            res.status(200).send(MessageHandle.ResponseText("This distribution does exist", distribution))
        } else {
            Distributions.create({
                name : data.name.toLowerCase(),
                parameters : data.parameters
            })
            .then(newDistribution => {
                res.status(200).send(MessageHandle.ResponseText("Created", newDistribution))
            })
            .catch(err => {
                res.status(500).send(MessageHandle.ResponseText("error", err))
            })
        }
    })
    .catch(err => {
        res.status(200).send(MessageHandle.ResponseText("error", err))
    })
})
module.exports = router