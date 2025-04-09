const express=require('express');
const router=express.Router();
const upload=require('../config/Multer.config');
const Product=require('../Schema/product');
const GetAllProducts=require('../Controller/Product.controller');
router.get('/productnames', async function(req,res){
    try {
        const products = await Product.find({});
const data=await GetAllProducts()

        res.send({products,mainCategory:data[0],subCategory:data[1]});
      } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching products');
      }
          //console.log(productlist.find())
//res.json(productlist.find())
})

router.get('/getbuyproduct',async(req,res)=>{
    let id=req.params.id;
    console.log(id);
    const result=await Product.find({
        _id:id
    })
    console.log(result);
    res.json(result);
})


module.exports=router;