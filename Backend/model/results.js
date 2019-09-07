
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId
const ResultSchema = new Schema({
    exercise :  {type : ObjectId, ref : "Exercises"},
    task : {type : ObjectId, ref : "Tasks"},
    user :  {type : ObjectId, ref : "Users"},
    data : [Number],
    summary : [{

    }]
    
})

