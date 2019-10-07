const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId
const TaskSchema = new Schema({
    title : String,
    name : String,
    distribution : {type : ObjectId, ref : "Distributions"},
    genAmount : Number,
    parameters : [{
        name : String,
        value : mongoose.Schema.Types.Mixed
    }],
    disable : {
        type : Boolean,
        default : false
    }
});

module.exports = Tasks = mongoose.model('Tasks', TaskSchema);