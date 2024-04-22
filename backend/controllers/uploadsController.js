const path = require('path');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError('Please upload image smaller 1MB');
  }
  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

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

      // Optionally, you can delete the temporary file after upload
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


module.exports = {
  uploadProductImage,
};
