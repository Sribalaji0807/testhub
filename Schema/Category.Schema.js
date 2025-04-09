const mongoose=require('../config/DB');
const Schema=new mongoose.Schema({
    name:String,
    parentCategory:{type:mongoose.Schema.Types.ObjectId,ref:'Category',default:null},
})
module.exports=mongoose.model('Category',Schema,'Category');