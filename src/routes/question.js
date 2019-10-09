const router = require('express').Router();
const Question = require('../models/question');

// get all
router.get('/', async (request, response) => {
  const questions = await Question.find({});

  response.json(questions);
});

// get specific question
router.get('/:questionId', async (request, response, next) => {
  const { questionId } = request.params;
  const questionIdNum = parseInt(questionId, 10);

  try {
    const selectedQuestion = await Question.findById(questionIdNum);
    response.json(selectedQuestion);
  } catch (error) {
    next(error);
  }
});

// get questions from specific category
router.get('/category/:categoryId', async (request, response, next) => {
  const { categoryId } = request.params;
  const categoryIdNum = parseInt(categoryId, 10);

  try {
    const selectedCategories = await Question.find({
      categoryId: categoryIdNum,
    });
    response.json(selectedCategories);
  } catch (error) {
    next(error);
  }
});

// insert many?

// add new
router.post('/', async (request, response, next) => {
  const newQuestion = new Question({
    _id: request.body._id,
    categoryId: request.body.categoryId,
    question: request.body.question,
    explanation: request.body.explanation,
    isSingleChoice: request.body.isSingleChoice,
    correctChoiceId: request.body.correctChoiceId,
    choices: request.body.choices,
  });
  try {
    const savedNewQuestion = await newQuestion.save();
    response.json(savedNewQuestion);
  } catch (error) {
    next(error);
  }
});

// update one
//* *HUOM. updates all fields
//* *should maeby check for empty fields?
router.patch('/:questionId', async (request, response, next) => {
  const { questionId } = request.params;
  const questionIdNum = parseInt(questionId, 10);

  try {
    const updatedQuestion = await Question.updateOne(
      { _id: questionIdNum },
      {
        $set: {
          categoryId: request.body.categoryId,
          question: request.body.question,
          explanation: request.body.explanation,
          isSingleChoice: request.body.isSingleChoice,
          correctChoiceId: request.body.correctChoiceId,
          choices: request.body.choices,
        },
      }
    );
    response.json(updatedQuestion);
  } catch (error) {
    next(error);
  }
});

// delete specific question
router.delete('/:questionId', async (request, response, next) => {
  const { questionId } = request.params;
  const questionIdNum = parseInt(questionId, 10);

  try {
    const removedQuestion = await Question.remove({ _id: questionIdNum });
    response.json(removedQuestion);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
