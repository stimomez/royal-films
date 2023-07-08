const cloudinary = require('cloudinary').v2;

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOU_NAME,
  api_key: process.env.CLOUDINARY_APY_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (folder, filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder,
  });
};

const deleteImage = async id => {
  return await cloudinary.uploader.destroy(id);

};

module.exports = { uploadImage, deleteImage };
