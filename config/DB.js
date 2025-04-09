const mongoose= require('mongoose')
const dotnev=require('dotenv')
dotnev.config();
const url = 'mongodb+srv://sribalaji:balaji@cluster0.vkx66zh.mongodb.net/productdetails?retryWrites=true&w=majority&appName=Cluster0'
console.log(url)
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{console.log("success")});

module.exports=mongoose;