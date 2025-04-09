const express=require('express');
const cors =require('cors');
const cookieParser = require('cookie-parser');
const dotenv=require('dotenv')
dotenv.config();
const path=require('path')
const multer= require('multer')
const fileUpload=require('./Imagekit')
const adminController=require('./adminController');
const AdminRoutes=require('./Routes/Admin.routes')
const Customer=require('./Schema/Customer.schema')
const Product=require('./Schema/product')
const AuthRoutes=require('./Routes/Auth.routes')
const ProductRoutes=require('./Routes/Product.routes')
const CartRoutes=require('./Routes/Cart.routes')
const UserRoutes=require('./Routes/User.routes');
const { tokenverify } = require('./Controller/JwtToken.controller');
const app=express();

async function print(a){
    var data1=await Customer.findOne({"Emailid":a});
    console.log(data1.Name);
     return data1["Name"];
}

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, './upload/');
//     },
//     filename: (req, file, cb) => {
//         const customFileName = req.body.fileName || Date.now() + path.extname(file.originalname);
//         cb(null, customFileName);
//       },
//   });
  
//  const upload = multer({ storage: storage });

const storage=multer.memoryStorage();
const upload=multer({storage:storage});
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api/admin',AdminRoutes);
app.use('/api/auth',AuthRoutes)
app.use('/api/cart',CartRoutes);
app.use('/api/products',ProductRoutes)
app.use('/api/user',tokenverify,UserRoutes)
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

app.post('/upload', upload.single('file'), async(req, res) => {

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
      const fileName = req.body.fileName || req.file.filename;
        console.log(`Uploaded file name: ${fileName}`);
    console.log(req.file.filename);
const fileurl=await fileUpload(req.body.fileName);
console.log(fileurl)
const product= new Product({
    ProductName:req.body.name,
    images:fileurl,
    price:req.body.price
}) 
product.save();

res.status(200).json({message:"success"})
})

app.listen(3000)
