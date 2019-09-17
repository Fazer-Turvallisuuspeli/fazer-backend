const router = require('express').Router();
const Category = require('../models/category');

router.get('/', async (request, response) => {
  const categories = await Category.find({});

  response.json(categories.map(category => category.toJSON()));
});

router.get('/:categoryId', async (request, response, next) => {
  const { categoryId } = request.params;
  const categoryIdNum = parseInt(categoryId, 10);

  try {
    const selectedCategory = await Category.findById(categoryIdNum);
    response.json(selectedCategory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
