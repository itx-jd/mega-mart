const Category = require('../models/Category');
const { StatusCodes } = require('http-status-codes');

const createCategory = async (req, res) => {
  try {
    const { categoryName, items } = req.body;

    const category = await Category.create({
      categoryName,
      items,
    });

    res.status(StatusCodes.CREATED).json({ category });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(StatusCodes.OK).json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params._id;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Category not found' });
    }
    res.status(StatusCodes.OK).json({ category });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params._id;
    const { categoryName, items } = req.body;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Category not found' });
    }
    category.categoryName = categoryName;
    category.items = items;
    await category.save();
    res.status(StatusCodes.OK).json({ category });
  } catch (error) {
   
    console.error('Error updating category:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params._id;
    await Category.findByIdAndDelete(categoryId);

    res.status(StatusCodes.OK).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};