const imagekit=require('../config/ImageKit.config');

const uploadImage=async(file,name)=>{
   const response=await imagekit.upload({
        file: file,
        fileName: name,
        folder: "/ecommerce_projects"
    }
    )
    return response.url;
}

module.exports=uploadImage;