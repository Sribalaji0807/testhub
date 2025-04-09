const express=require('express');
const {Createuser,login}=require('../Controller/auth.controller.js');
const { tokenverify } = require('../Controller/JwtToken.controller.js');
const router=express.Router();

router.get('/logout',tokenverify,async(req,res)=>{
    console.log("start");
    res.cookie('jwt', '', { httpOnly: true, secure: true, maxAge: 120000 });
    res.status(200).send('Logged out');
})

router.post('/signup',async function(req,res){
    const data=req.body;
    const create=await Createuser(data["email"],data["password"]);
    if(create){
        res.status(200).send("success");
    }
    else{
        res.status(400).send("failed");
    }

})

router.post('/login',async function(req,res){
   const{email,password}=req.body;
try {
    const {token,data1}=await login(email,password,res);
    console.log(token);
    console.log(data1);
    // data1["tokenExpires"]=360000;
    res.cookie('jwt',token,{httpOnly:true,secure:false,sameSite: 'lax',maxAge:360000}).status(200).json(data1)
    
} catch (error) {
    res.status(400).send({ message: error.message || 'Login failed' });
}
    })


module.exports=router;