const auth =require('../config/firebase.config');
const {createUserWithEmailAndPassword,signInWithEmailAndPassword}=require('firebase/auth');
const customer=require('../Schema/Customer.schema')
const {tokenGenerator}=require('./JwtToken.controller');
async function CreateUser(Name, email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const data = new customer({
            Emailid: email,
            Name: Name,
            Cart: [],
            Orders: []
        });

        const response=await data.save(); // Save the data
        console.log(response);
        
        const token= await tokenGenerator({id:response._id});
 const { _id, ...userData } =  response.toObject();
 console.log("userData",userData);

        return { token, response: userData };
        
    } catch (err) {
        console.error("Error:", err.message);
        return null;
    }
}

async function login(email,password){
    try {
        const userCredential=await signInWithEmailAndPassword(auth,email,password)
        const user=userCredential.user;
        console.log("login successful");
   
        const find=await customer.findOne({Emailid:email});
       
        if (!find) throw new Error('User not found in the database');
    const data={
        id:find._id,
    }
        const token =await tokenGenerator(data);
    const {_id,...data1}=find.toObject();
  
    return {token,data1};
      
    } catch (error) {
        console.error('Error in login:', error);
        throw error;
    }
  
}
//CreateUser('sribalaji','sribalaji20040708@gmail.com','sribalaji');
module.exports={CreateUser,login};