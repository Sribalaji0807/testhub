const imagekit=require('../config/ImageKit.config');

const uploadImage=async(file,name)=>{
   const response=await imagekit.upload({
        file: file,
        fileName: name,
        folder: "/Ecommerce_user_profile"
    }
    )
    return response.url;
}

module.exports=uploadImage;