const mongoose=require('../config/DB');
const customer =new mongoose.Schema({
    Emailid:String,
    Name:String,
    Image:String,
    Admin:Boolean,
    Cart:Array,
    Orders:Array
});
const Customer=mongoose.model('Customer',customer,'Customer');
module.exports=Customer