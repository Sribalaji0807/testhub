const express=require('express');
const router=express.Router();
const upload=require('../config/Multer.config');
const Product=require('../Schema/product');
const GetAllProducts=require('../Controller/Product.controller');
const { tokenverify } = require('../Controller/JwtToken.controller');
const Customer=require('../Schema/Customer.schema');

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
router.get('/getbuyproduct/:id',async(req,res)=>{
    let id=req.params.id;
    console.log(id);
    const result=await Product.find({
        _id:id
    })
    console.log(result);
    res.json(result);
})

router.post('/order', tokenverify, async (req, res) => {
    const data = req.body;

    try {
        console.log("User ID from Token:", req.user);

        if (!data.id) {
            return res.status(400).json({ message: "Order ID is required" });
        }

        const update = await Customer.findOneAndUpdate(
            { _id: req.user },
            { $push: { Orders: data.id } },
            { new: true }
        );

        if (!update) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Order added successfully", orders: update.Orders });

    } catch (err) {
        console.error("Error adding order:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/getmyorder', tokenverify,async(req,res)=>{
  
   const user=await Customer.find({
        _id:req.user,
    })
    console.log(user);

    const update=user[0].Orders;

    const products = await Product.find({"_id":{$in:update}});

    res.json(products);
})


module.exports=router;