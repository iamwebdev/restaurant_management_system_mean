var express = require('express')
var router =  express.Router();
var Booking = require('../Models/booking')
var Table = require('../Models/table')

router.post('/book-table',(req, res) => {
    Table.findOne({'table_type': req.body.table_type, 'compartment': req.body.compartment},(err, doc) => {
        if (!err) {
            var totalTables = doc.count
            Booking.find({'date':req.body.date, 'table_type': req.body.table_type, 'category': req.body.compartment},)
        } else {
            return res.json({status: false, message: 'Something went wrong'})
        }
    })
    
    
    // Income.aggregate([{
    //     $match : { $and : [ {owner: userId}, {date: { $gte: start, $lt: end } }] },
    // },{
    //     $group : {
    //         _id : null,
    //         total : {
    //             $sum : "$amount"
    //         }
    //     }
    // }],callback);

})

module.exports = router