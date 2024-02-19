const express=require('express');
const cors =require('cors');
const mongoose=require('mongoose');
//const mongodb=require('mongodb')
const app=express();
const url = 'mongodb://localhost:27017/productdetails';
// const client = new mongodb.MongoClient(url);

// client.connect((err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Connected successfully to server");

//         const db = client.db('productdetails');
//         const collection = db.collection('product');
//         console.log("Collection 'product' is ready.");
//     }
// });
// const customer=new mongoose.Schema({
//     email:String,
// })
// const id=mongoose.model('id',customer,'customer')
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{console.log("success")});
const products =new mongoose.Schema({
    Productname:[String],
    images:[String]
})
const Product=mongoose.model('Product',products,'product');
async function print(){
    const data=await Product.find();
    console.log(data);
}
print();
console.log('success');
app.use(cors());
app.use(express.json());
app.post('/login',async function(req,res){
let data=req.body;
data["returnSecureToken"]=true;
// console.log(data);

   const response=await fetch('api url',{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data),
   })
if(response.ok){
    console.log("error");
res.status(200).send();
}

data=null;
})

app.get('/productnames', async function(req,res){
    try {
        const products = await Product.find({});
        console.log(products);
        res.send(products);
      } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching products');
      }
          //console.log(productlist.find())
//res.json(productlist.find())
})

app.listen(3000)
