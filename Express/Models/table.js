var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tableSchema = new Schema({
    table_type : {type: String},
    count: {type: Number},
    compartment: {type: String}
});

module.exports = mongoose.model('Table', tableSchema);