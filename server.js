const express=require('express');
const cors =require('cors');
const { ObjectId } = require('mongoose').Types;
const Product=require('./product')
const mongoose=require('mongoose');
const app=express();
const url = 'mongodb://localhost:27017/productdetails';

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{console.log("success")});
const customer =new mongoose.Schema({
    Emailid:String,
    Name:String,
    Cart:Array,
    Orders:Array
});
const Customer=mongoose.model('Customer',customer,'Customer');
async function print(a){
    var data1=await Customer.findOne({"Emailid":a});
    console.log(data1.Name);
     return data1["Name"];
}

//print();
//console.log('success');
// async function cart() {
//     try {
//       let user = 'Sribalaji';
//       var temp={
//         Productname:[],
//         images:[]
//       };
//       const get = await Customer.findOne({ Name: user });
//       let cartdetails = get.Cart;
  
//       if (!cartdetails || cartdetails.length === 0) {
//         console.log('Cart is empty');
//         return;
//       }
  
//       const products = await Product.find({});
  
//       if (!products) {
//         console.log('No products found');
//         return;
//       }
  
//       console.log(products[0].Productname[cartdetails]);
//       for(var i=0;i<cartdetails.length;i++){
//         temp.Productname.push(products[0].Productname[cartdetails[i]]);
//         temp.images.push(products[0].images[cartdetails[i]]);

//       }
//       console.log(temp);
//     } catch (error) {
//       console.error('Error in cart function:', error);
//     }
//   }
// // Invoke cart asynchronously
// cart().then(() => {
//     console.log('Cart operation completed.');
// }).catch(error => {
//     console.error('Error invoking cart:', error);
// });

console.log(process.env.api_key);

app.use(cors());
app.use(express.json());


app.post('/login',async function(req,res){
let data=req.body;
data["returnSecureToken"]=true;
console.log(process.env.api_key);

   const response=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.api_key}`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data),
   })
if(response.ok){
    //console.log(response);
    console.log(data["email"]);
var name=await print(data["email"]);
var data1={
    "name":name,
}
console.log(data1);
res.status(200).send(data1)
}

data=null;
})

app.get('/productnames', async function(req,res){
    try {
        const products = await Product.find({});

        res.send(products);
      } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching products');
      }
          //console.log(productlist.find())
//res.json(productlist.find())
})
app.post('/deletetheuserproduct',async(req,res)=>{
    let data=req.body;
    console.log(data.id);

   const update=await Customer.findOneAndUpdate({
        Name:data.Name,
    },{
        $pull:{Cart:data.id}
    },
    {new:true})
    res.status(200).send("success");

})

app.post('/addtocart' ,async function(req,res){
    let data=req.body;
    console.log(data.id);
  //  const productId = new ObjectId(data.index);

   const update=await Customer.findOneAndUpdate({
        Name:data.Name,
    },{
        $push:{Cart:data.id}
    },
    {new:true})
    res.status(200);
})

app.post('/getthecart',async function(req,res){
let user=req.body;
console.log("------");
  console.log(user['name']);

  const get = await Customer.findOne({ Name: user['name'] });
  let cartdetails = get.Cart;
console.log(cartdetails);
  if (!cartdetails || cartdetails.length === 0) {
    console.log('Cart is empty');
    return;
  }

  const products = await Product.find({"_id":{$in:cartdetails}});
  console.log(products)

  // if (!products) {
  //   console.log('No products found');
  //   return;
  // }

  // console.log(products[0].Productname[cartdetails]);
  // for(var i=0;i<cartdetails.length;i++){
  //   temp.Productname.push(products[0].Productname[cartdetails[i]]);
  //   temp.images.push(products[0].images[cartdetails[i]]);

  // }
  // console.log(temp);
  res.status(200).send(products);
})

app.get('/getbuyproduct/:id',async(req,res)=>{
    let id=req.params.id;
    console.log(id);
    const result=await Product.find({
        _id:id
    })
    console.log(result);
    res.json(result);
})
app.post('/order',async(req,res)=>{
    let data=req.body;
    console.log(data.id);
  //  const productId = new ObjectId(data.index);

   const update=await Customer.findOneAndUpdate({
        Name:data.Name,
    },{
        $push:{Orders:data.id}
    },
    {new:true})
    res.status(200);
})
app.post('/getmyorder',async(req,res)=>{
    let data=req.body;
   const user=await Customer.find({
        Name:data.Name,
    })
    console.log(user);

    const update=user[0].Orders;

    const products = await Product.find({"_id":{$in:update}});

    res.json(products);
})

app.listen(3000)
