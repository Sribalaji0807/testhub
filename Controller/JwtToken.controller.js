const jwt=require('jsonwebtoken');

const tokenGenerator=async(data1)=>{
    const token= await jwt.sign(data1,process.env.JWT_SECRET_KEY);
    return token;
}
const tokenverify=async(req,res,next)=>{
    const token=req.cookies.jwt;
    try {
        if(jwt.verify(token,process.env.JWT_SECRET_KEY)){
            const details=jwt.decode(token);
            req.user= details.id;

        }
        else{
            return res.status(401).json({message:"Invalid token"})
        }
        next();

    } catch (error) {
        res.status(500).json({message:"server error"})
    }
}
module.exports={tokenGenerator,tokenverify}