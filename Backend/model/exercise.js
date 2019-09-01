const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId
const ExerciseSchema = new Schema({
    nameshow : String,
    name : String,
    section : {
        type : String,
        default : "cpe"
    },
    tasks : [{
        taskid : {type : ObjectId, ref : "Tasks"}
    }],
    disable : {
        type : Boolean,
        default : false
    }
});

module.exports = Exercises = mongoose.model('Exercises', ExerciseSchema);