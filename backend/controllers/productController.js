// controllers/productController.js

const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const { uploadProductImage } = require('./uploadsController'); // Import the uploadProductImage controller

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);

  // Assuming you have an array of image files in req.files.images
  if (req.files && req.files.images && req.files.images.length > 0) {
    const imageUrls = await getImageUrls(req.files.images);
    product.images = imageUrls; // Assuming your Product model has an 'images' field
    console.log( imageUrls);
    await product.save();
  }

  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

const getImageUrls = async (images) => {
  const imageUrls = [];
  for (const image of images) {
    const result = await uploadProductImage(image);
    imageUrls.push(result.image.src);
  }
  return imageUrls;
};

const getProductsByName = async (req, res) => {
  try {
    const { itemName } = req.query;
    const products = await Product.find({ itemName: { $regex: new RegExp(itemName, 'i') } });
    res.status(StatusCodes.OK).json({ products });
  } catch (error) {
    console.error('Error fetching products by name:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getImageUrls,
  getProductsByName, 
};
