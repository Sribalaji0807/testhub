const mongoose=require('./DB');

const schema=new mongoose.Schema({
    Total_Product:Number,
    Total_Orders:Number,
    Orders:Array
})
const Admin=mongoose.model('Admin',schema,'Admin');
module.exports=Admin;