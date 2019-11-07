const router = require('express').Router();
const Category = require('../models/category');
const Questions = require('../models/question');

// get all
router.get('/', async (request, response) => {
  const categories = await Category.find({});
  response.json(categories.map(category => category.toJSON()));
});

// get specific
router.get('/:categoryId', async (request, response, next) => {
  const { categoryId } = request.params;

  try {
    const selectedCategory = await Category.findById(categoryId);
    response.json(selectedCategory);
  } catch (error) {
    next(error);
  }
});

// get questions
router.get('/:categoryId/questions', async (request, response, next) => {
  const { categoryId } = request.params;
  try {
    const questions = await Questions.find({ categoryId });
    response.json(questions);
  } catch (error) {
    next(error);
  }
});

// get specific question
router.get(
  '/:categoryId/questions/:questionId',
  async (request, response, next) => {
    const { questionId } = request.params;
    try {
      const questions = await Questions.findById(questionId);
      response.json(questions);
    } catch (error) {
      next(error);
    }
  }
);

// add new category
router.post('/', async (request, response, next) => {
  const newCategory = new Category({
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
router.put('/:categoryId', async (request, response, next) => {
  const { categoryId } = request.params;
  const category = request.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      category,
      { new: true }
    );
    response.json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

// delete specific category
router.delete('/:categoryId', async (request, response, next) => {
  const { categoryId } = request.params;

  try {
    const removedCategory = await Category.remove({ _id: categoryId });
    response.json(removedCategory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
