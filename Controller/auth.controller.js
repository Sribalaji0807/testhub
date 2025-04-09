const auth =require('../config/firebase.config');
const {createUserWithEmailAndPassword,signInWithEmailAndPassword}=require('firebase/auth');
const customer=require('../Schema/Customer.schema')
const {tokenGenerator}=require('./JwtToken.controller');
function CreateUser(Name,email,password){

    const response=createUserWithEmailAndPassword(auth,email,password)
    .then(async(userCredential)=>{
        const user=userCredential.user;
        console.log(user);
        try {
            const data = new customer({
                Emailid: email,
                Name: Name,
                Cart: [],
                Orders: []
            });
        
            const savedData = await data.save(); // Save the data
          
        } catch (err) {
            console.error("Error saving user:", err); // Handle errors
        }
    })
    .catch((error)=>{
        const errorCode=error.code;
        const errorMessage=error.message;
        console.log(errorCode,errorMessage);
    })

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