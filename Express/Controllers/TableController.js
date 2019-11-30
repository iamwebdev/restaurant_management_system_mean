var express = require('express');
var router = express.Router();
var Table = require('../Models/table');
var ObjectId = require('mongoose').Types.ObjectId;

// get all data from Table
router.get('/add-table',(req,res) => { 
    Table.find((err,docs) => {
        if(docs)
            return res.json({status:true,data:docs})
        else
            return res.json({status:false,message:'Something went wrong'})
    })
})

// save data in Table
router.post('/add-table', (req,res) => {
    var tableData = new Table({
        table_type: req.body.table_type,
        count: req.body.table_count,
        compartment: req.body.compartment
    });
    Table.find({'table_type' : req.body.table_type, compartment: req.body.compartment} ,(err,docs)=>{
        if(docs == '')
            tableData.save((err, doc) => {
                if (!err)
                    return res.json({status: true, message:'Table added'})
                else
                    return res.json({status: false, message: 'Something went wrong'})    
            });
        else
            return res.json({status: false, message: req.body.table_type+' already exists'})
    })
})

// get table data by id
router.get('/add-table/:id',(req,res) => {
    Table.findById(req.params.id,(err,doc) => {
        if(!err)
            return res.json({status:true,data:doc})
        else    
            return res.json({status:false})
    })
})

// Update Table Details
router.put('/add-table/:id',(req,res) => {
    var formData = {
        table_type: req.body.table_type,
        count: req.body.table_count,
        compartment: req.body.compartment
    };
    if (ObjectId.isValid(req.params.id)) {
        Table.findOneAndUpdate(req.params.id, {$set : formData}, {new: true},(err, doc) => {
            if(!err) 
                return res.json({status: true, message:'Table updated'})
            else
                return res.json({status: false, message:'Something went wrong'}) 
        })
    } else {
        return res.json({status: false, message:'Something went wrong'}) 
    }
})

// Delete Table
router.delete('/delete-table/:id',(req, res) => {
    if(ObjectId.isValid(req.params.id)) {
        Table.findByIdAndDelete(req.params.id, (err, doc) => {
            if(!err) 
                return res.json({status: true, message:'Table deleted'})
            else
                return res.json({status: false, message:'Something went wrong'})
             
        })
    } else {
        return res.json({status: false, message:'Something went wrong'}) 
    }
})
module.exports = router