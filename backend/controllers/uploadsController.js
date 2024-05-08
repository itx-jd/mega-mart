const path = require('path');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const uploadProductImage = async (req, res) => {
  try {
    if (!req.files || !req.files.images || req.files.images.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'No images uploaded' });
    }

    const imageUrls = [];

    for (const imageFile of req.files.images) {
      const result = await cloudinary.uploader.upload(imageFile.tempFilePath, {
        use_filename: true,
        folder: 'file-upload',
      });
      
      imageUrls.push(result.secure_url);

      fs.unlinkSync(imageFile.tempFilePath);
    }

    return res.status(StatusCodes.OK).json({ images: imageUrls });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  uploadProductImage,
};
