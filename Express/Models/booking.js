var mongoose = require('mongoose')
var Schema = mongoose.Schema

var bookingSchema = new Schema({
    name: {type: String},
    date: {type: Date},
    table_type: {type: String},
    category: {type: String}
})

module.exports = mongoose.model('Booking',bookingSchema)