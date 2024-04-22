const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

router.route('/')
  .post(createCategory) 
  .get(getAllCategories); 

router.route('/:_id')
  .get(getCategoryById)
  .put(updateCategory) 
  .delete(deleteCategory);

module.exports = router;
