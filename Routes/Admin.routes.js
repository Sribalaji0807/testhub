const express=require('express');
const router=express.Router();
const upload=require('../config/Multer.config');
const Product=require('../Schema/product');
const uploadImage=require('../Controller/Admin.controller');
const Category=require('../Schema/Category.Schema');
router.post('/setproduct',upload.single('file'),async(req,res)=>{
    if (!req.file) {
        return res.status(400).send("No file uploaded");
      }  
      const response=await uploadImage(req.file.buffer,req.file.originalname);
      console.log(req.body)
      const category= await Category.findOne({name:req.body.parentCategory});
 console.log(category,req.body.parentCategory);
      const product= new Product({
        ProductName:req.body.name,
        images:response,
        price:req.body.price,
category:category._id,
description:req.body.description
    })
    product.save();
    res.status(200).send("File uploaded successfully");
})

router.post('/setCategory',async(req,res)=>{
const {CategoryName,ParentCategory}=req.body;
if(ParentCategory==="na"){
  const category=new Category({
    name:CategoryName,
    parentCategory:null
  })
  category.save();
  res.status(200).send("success");
}
else{
  const category= await Category.findOne({name:ParentCategory});
  const newCategory=new Category({
    name:CategoryName,
    parentCategory:category._id
  })
  newCategory.save();
  res.status(200).send("success");

}

})

module.exports=router;
