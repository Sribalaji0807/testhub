const express=require('express')
const router=express.Router();
const Customer=require('../Schema/Customer.schema');
const Product=require('../Schema/product');
const {tokenverify}=require('../Controller/JwtToken.controller');
router.post('/addtocart' ,tokenverify,async function(req,res){
    let data=req.body;
    let user=req.user;
    console.log(data.id);
  //  const productId = new ObjectId(data.index);

   const update=await Customer.findOneAndUpdate({
    _id:user,
    },{
        $push:{Cart:data.id}
    },
    {new:true})
    res.status(200).send("success");
})

router.get('/getthecart',tokenverify,async function(req,res){
  
    
      const get = await Customer.findOne({ _id: req.user });
      let cartdetails = get.Cart;
    console.log(cartdetails);
      if (!cartdetails || cartdetails.length === 0) {
        console.log('Cart is empty');
        res.json([]);
        return;
      }
    
      const products = await Product.find({"_id":{$in:cartdetails}});
      console.log(products)

      res.status(200).send(products);
    })
    router.post('/deletetheuserproduct',tokenverify,async(req,res)=>{
        let data=req.body;
        console.log(data.id);
    
       const update=await Customer.findOneAndUpdate({
       _id:req.user,
        },{
            $pull:{Cart:data.id}
        },
        {new:true})
        res.status(200).send("success");
    
    })
    module.exports=router