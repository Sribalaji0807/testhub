const mongoose=require('../config/DB');
const products =new mongoose.Schema({
    ProductName:String,
    images:String,
    description:String,
    category:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'Category'   
    },
    price:String
},{ versionKey: false })
const Product=mongoose.model('Product',products,'product');

module.exports=Product