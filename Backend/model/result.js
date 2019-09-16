
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId
const ResultSchema = new Schema({
    exerciseName :  String,
    taskName : String,
    userName :  String,
    distribution : String,
    data : [Number],
    summary : {
        mean : Number, 
        median : Number,
        mode :  [Number],
        maxValue : Number,
        minValue : Number,
        sd : Number,
        variance : Number,
        cumulative : [Number]
    },
    timeStamp : { type : Date, default: Date.now }
    
},{ toJSON: { virtuals: true }})

ResultSchema.virtual('exerciseDetail', {
    ref : 'Exercises',
    localField : 'exerciseName',
    foreignField :'name',
    justOne : true
})

ResultSchema.virtual('taskDetail', {
    ref : 'Tasks',
    localField : 'taskName',
    foreignField :'name',
    justOne : true
})

ResultSchema.virtual('userDetail', {
    ref : 'Users',
    localField : 'userName',
    foreignField :'userName',
    justOne : true
})

module.exports = Results = mongoose.model('Results', ResultSchema)
