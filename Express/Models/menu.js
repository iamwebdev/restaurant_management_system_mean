var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var menuSchema = new Schema({
    menu_type : {type:String},
    item : {type:String},
    price : {type:Number},
    category : {type:String}
});

module.exports = mongoose.model('Menu',menuSchema);

