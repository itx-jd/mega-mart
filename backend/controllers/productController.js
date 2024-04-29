const Category = require('../models/Category');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const { uploadProductImage } = require('./uploadsController');

const createProduct = async (req, res) => {
  
  const { itemName, description, price, quantity, category } = req.body;

  const categoryobj = await Category.findById(category);
  if (!categoryobj) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: `Category not found` });
  }

  const newproduct = new Product({
    itemName,
    description,
    price,
    quantity,
  });

  if (req.files && req.files.images && req.files.images.length > 0) {
    const imageUrls = await getImageUrls(req.files.images);
    newproduct.images = imageUrls; 
    console.log(imageUrls);
    console.log(newproduct.itemName);
    await newproduct.save();
    categoryobj.items.push(newproduct._id);
    await categoryobj.save();
  }
  res.status(StatusCodes.CREATED).json({ newproduct });
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

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { itemName, description, price, quantity, categoryId } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      itemName,
      description,
      price,
      quantity,
    }, { new: true });

    if (!updatedProduct) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Product not found' });
    }

    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Category not found' });
      }
      await Category.findOneAndUpdate({ items: productId }, { $pull: { items: productId } });
      category.items.push(productId);
      await category.save();
    }

    res.status(StatusCodes.OK).json({ product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Product not found' });
    }

    await Category.updateMany({}, { $pull: { items: productId } });

    res.status(StatusCodes.OK).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getImageUrls,
  getProductsByName, 
  updateProduct,
  deleteProduct
};