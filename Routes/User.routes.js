const express=require('express');
const upload=require('../config/Multer.config');
const uploadImage=require('../Controller/User.controller');
const router=express.Router();

const Customer=require('../Schema/Customer.schema');
const { tokenverify } = require('../Controller/JwtToken.controller');

router.post('/UpdateProfile',upload.single('file'),async function(req,res){
    if (!req.file) {
        return res.status(400).send("No file uploaded");
      }
    const response=await uploadImage(req.file.buffer,req.file.originalname);
      
    
      const update = await Customer.findOneAndUpdate(
        { id: req.user.id },         {
          $set: {
            Image: response.url, 
          ...req.body, 
          },
        },
        { new: true } 
      );
  
      
      if (!update) {
        return res.status(400).send("Profile update failed");
      }
  
      
      res.status(200).send("Profile updated successfully");

      res.send("File uploaded successfully");
})

module.exports=router;
