const mongoose= require('mongoose')

const url = 'mongodb://localhost:27017/productdetails';

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{console.log("success")});
const products =new mongoose.Schema({
    ProductName:String,
    images:String
})
const Product=mongoose.model('Product',products,'product');

module.exports=Product