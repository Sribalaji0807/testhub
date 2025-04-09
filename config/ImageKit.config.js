const ImageKit = require('imagekit');


const imagekit = new ImageKit({
   publicKey: process.env.image_public_key,
   privateKey: process.env.image_private_key,
   urlEndpoint: "https://ik.imagekit.io/myprojectphotos"
});

module.exports=imagekit;