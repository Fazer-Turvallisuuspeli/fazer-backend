const uuid = require('uuid/v4');
const router = require('express').Router();
const Question = require('../models/question');
const Category = require('../models/category');

// get all
// /questions
router.get('/', async (request, response) => {
  const questions = await Question.find({});
  response.json(questions.map(question => question.toJSON()));
});

// get specific question
router.get('/:questionId', async (request, response, next) => {
  const { questionId } = request.params;

  try {
    const selectedQuestion = await Question.findById(questionId);
    response.json(selectedQuestion);
  } catch (error) {
    next(error);
  }
});

// add new
router.post('/', async (request, response, next) => {
  const correctChoice = request.body.choices;
  correctChoice.forEach(choices => {
    choices.id = uuid();
  });
  const choicesArray = correctChoice.map(choice =>
    choice.isCorrect ? choice.id : null
  );
  const correctChoiceId = choicesArray.filter(Boolean);

  const newQuestion = new Question({
    categoryId: request.body.categoryId,
    question: request.body.question,
    explanation: request.body.explanation,
    isSingleChoice: request.body.isSingleChoice,
    correctChoiceId,
    choices: request.body.choices,
  });
  const relatedCategory = Category.findById(request.body.categoryId);
  newQuestion.category = relatedCategory.id;
  try {
    const savedNewQuestion = await newQuestion.save();
    response.json(savedNewQuestion);
  } catch (error) {
    next(error);
  }
});

// update one
router.put('/:questionId', async (request, response, next) => {
  const { questionId } = request.params;
  const question = request.body;
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      question,
      { new: true }
    );
    response.json(updatedQuestion);
  } catch (error) {
    next(error);
  }
});

// delete specific question
router.delete('/:questionId', async (request, response, next) => {
  const { questionId } = request.params;

  try {
    const removedQuestion = await Question.remove({ _id: questionId });
    response.json(removedQuestion);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
