
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId
const ResultSchema = new Schema({
    exercisename :  String,
    taskname : String,
    username :  String,
    distribution : String,
    data : [Number],
    summary : {
        mean : Number, 
        median : Number,
        mode :  [Number],
        sd : Number,
        variance : Number,
        cumulative : [Number]
    }
    
},{ toJSON: { virtuals: true }})

ResultSchema.virtual('exercisedetail', {
    ref : 'Exercises',
    localField : 'exercisename',
    foreignField :'name',
    justOne : true
})

ResultSchema.virtual('taskdetail', {
    ref : 'Tasks',
    localField : 'taskname',
    foreignField :'name',
    justOne : true
})

ResultSchema.virtual('userdetail', {
    ref : 'Users',
    localField : 'username',
    foreignField :'username',
    justOne : true
})

module.exports = Results = mongoose.model('Results', ResultSchema)
