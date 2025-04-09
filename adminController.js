const express=require('express');
const router=express.Router();
const admin=require('./config/AdminDb');
const Product=require('./Schema/product');
router.get('/',async(req,res)=>{
    const data=await admin.find({});
    res.send(data);
})
router.get('/getProducts',async(req,res)=>{
    const data=await Product.find({});
    res.send(data);
})
module.exports=router;