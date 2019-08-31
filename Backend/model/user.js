const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId
const UserSchema = new Schema({

    username : String,
    fullname : String,
    admin :  {
        type : Boolean,
        default : false
    },
    section : {
        type : String,
        default : "cpe"
    }
});

module.exports = User = mongoose.model('Users', UserSchema);