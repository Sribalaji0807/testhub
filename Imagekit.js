const ImageKit = require('imagekit');
const fs = require('fs');
const path = require('path');

var imagekit = new ImageKit({
   publicKey: process.env.image_public_key,
   privateKey: process.env.image_private_key,
   urlEndpoint: "https://ik.imagekit.io/myprojectphotos"
});

async function fileupload(name) {
    if (!name) {
        throw new Error('Error: File name is not provided.');
    }

    const filePath = path.join(__dirname, 'upload', name);
    console.log(filePath);

    // Wrap fs.readFile in a Promise
    const readFileAsync = (filePath) => {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    };

    // Wrap imagekit.upload in a Promise
    const uploadFileAsync = (file) => {
        return new Promise((resolve, reject) => {
            imagekit.upload({
                file: file,
                fileName: name,
                folder: "/ecommerce_projects"
            }, (error, result) => {
                if (error) reject(error);
                else resolve(result.url);
            });
        });
    };

    try {
        const fileData = await readFileAsync(filePath);
        const imageUrl = await uploadFileAsync(fileData);
        console.log('File uploaded successfully:', imageUrl);

        // Delete the file after uploading
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }
        });

        return imageUrl;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

module.exports = fileupload;
