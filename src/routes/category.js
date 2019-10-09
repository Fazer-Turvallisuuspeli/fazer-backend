const router = require('express').Router();
const Category = require('../models/category');

// get all
router.get('/', async (request, response) => {
  const categories = await Category.find({});

  response.json(categories.map(category => category.toJSON()));
});

// get specific
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

// insert many?

// add new category
router.post('/', async (request, response, next) => {
  const newCategory = new Category({
    _id: request.body._id,
    name: request.body.name,
    instructions: request.body.instructions,
  });
  try {
    const savedNewCategory = await newCategory.save();
    response.json(savedNewCategory);
  } catch (error) {
    next(error);
  }
});

// update
//* *HUOM. updates all fields
//* *should maeby check for empty fields?
router.patch('/:categoryId', async (request, response, next) => {
  const { categoryId } = request.params;
  const categoryIdNum = parseInt(categoryId, 10);

  try {
    const updatedCategory = await Category.updateOne(
      { _id: categoryIdNum },
      {
        $set: {
          name: request.body.name,
          instructions: request.body.instructions,
        },
      }
    );
    response.json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

// delete specific category
router.delete('/:categoryId', async (request, response, next) => {
  const { categoryId } = request.params;
  const categoryIdNum = parseInt(categoryId, 10);

  try {
    const removedCategory = await Category.remove({ _id: categoryIdNum });
    response.json(removedCategory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
