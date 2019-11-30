var express = require('express');
var router = express.Router();
var Menu = require('../Models/menu');
var ObjectId = require('mongoose').Types.ObjectId;

// get all items list
router.get('/add-menu',(req,res) => {
    Menu.find((err,docs) => {
        if (!err)
            return res.json({status:true,data:docs})
        else
            return res.json({status:false,message:'Something went wrong'})
    })
});

// add items 
router.post('/add-menu',(req,res) => {
    var menuData = new Menu({
        menu_type: req.body.menu_type,
        item:req.body.item,
        price:req.body.price,
        category:req.body.category
    });
    Menu.find({'item' : req.body.item,'menu_type' : req.body.menu_type, 'category' : req.body.category} ,(err,docs)=>{
        if(docs == '')
            menuData.save((err, doc) => {
                if (!err)
                    return res.json({status: true, message:'Item added'})
                else
                    return res.json({status: false, message: 'Something went wrong'})    
            });
        else
            return res.json({status: false, message: req.body.item+' already exists'})
    })
});

// get menu list by id
router.get('/add-menu/:id',(req,res) => {
    Menu.findById(req.params.id,(err,doc) => {
        if (!err)
            return res.json({status:true,data:doc})
        else
            return res.json({status:false,message:'Something went wrong'})
    });
});

// update menu list by id
router.put('/add-menu/:id',(req,res) => {
    var menuData = {
        menu_type: req.body.menu_type,
        item:req.body.item,
        price:req.body.price,
        category:req.body.category
    }
    if (ObjectId.isValid(req.params.id)) {
        Menu.findOneAndUpdate(req.params.id,{$set:menuData},{new:true},(err,doc) => {
            if (!err)
                return res.json({status:true,message:'Menu updated'})
            else
                return res.json({status:false,message:"Something went wrong"})
        })
    } else {
        return res.json({status:false,message:"Something went wrong"})
    }
});

// delete item by id
router.delete('/delete-menu/:id',(req, res) => {
    if(ObjectId.isValid(req.params.id)) {
        Menu.findByIdAndDelete(req.params.id, (err, doc) => {
            if(!err) 
                return res.json({status: true, message:'Item deleted'})
            else
                return res.json({status: false, message:'Something went wrong'})
             
        })
    } else {
        return res.json({status: false, message:'Something went wrong'}) 
    }
})

module.exports = router;