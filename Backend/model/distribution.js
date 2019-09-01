const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId
const DistributionSchema = new Schema({
    name : String,
    parameters : [{
        name : String,
        meaning : String
    }]
});

module.exports = Distributions = mongoose.model('Distributions', DistributionSchema);