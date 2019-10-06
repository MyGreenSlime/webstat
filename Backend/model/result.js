
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId
const ResultSchema = new Schema({
    exerciseName :  String,
    taskName : String,
    username :  String,
    distribution : String,
    data :mongoose.Schema.Types.Mixed,
    summary : {
        mean : mongoose.Schema.Types.Mixed, 
        median : mongoose.Schema.Types.Mixed,
        mode :  mongoose.Schema.Types.Mixed,
        maxValue : mongoose.Schema.Types.Mixed,
        minValue : mongoose.Schema.Types.Mixed,
        sd : mongoose.Schema.Types.Mixed,
        variance : mongoose.Schema.Types.Mixed,
        cumulative : mongoose.Schema.Types.Mixed,
        count : Number
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
