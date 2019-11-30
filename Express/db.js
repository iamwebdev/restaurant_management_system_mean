const mongoose = require('mongoose');
if (mongoose.connect('mongodb://localhost:27017/restraunt', {useNewUrlParser: true, useUnifiedTopology: true}))
    console.log('MongoDb Connected');
else
    console.log('Error in MongoDb Connection');
module.exports = mongoose