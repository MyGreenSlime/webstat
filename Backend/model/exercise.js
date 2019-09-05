const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId
const ExerciseSchema = new Schema({
    title : String,
    name : String,
    description : String,
    section : {
        type : String,
        default : "cpe"
    },
    tasks : [
        {type : ObjectId, ref : "Tasks"}
    ],
    disable : {
        type : Boolean,
        default : false
    }
});

module.exports = Exercises = mongoose.model('Exercises', ExerciseSchema);