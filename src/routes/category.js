const router = require('express').Router();
const jwt = require('jsonwebtoken');
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
    if (!request.token) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const savedNewCategory = await newCategory.save();
    return response.json(savedNewCategory);
  } catch (error) {
    return next(error);
  }
});

// update USE TOKEN
router.put('/:categoryId', async (request, response, next) => {
  const { categoryId } = request.params;
  const category = request.body;

  try {
    if (!request.token) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      category,
      { new: true }
    );
    return response.json(updatedCategory);
  } catch (error) {
    return next(error);
  }
});

// delete specific category  USE TOKEN
router.delete('/:categoryId', async (request, response, next) => {
  const { categoryId } = request.params;

  try {
    if (!request.token) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const removedCategory = await Category.deleteOne({ _id: categoryId });
    return response.json(removedCategory);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
