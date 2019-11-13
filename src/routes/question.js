const uuid = require('uuid/v4');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Question = require('../models/question');
const Category = require('../models/category');

// get all questions
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

// add new USE TOKEN
router.post('/', async (request, response, next) => {
  const correctChoice = request.body.choices;
  // create id for choices
  correctChoice.forEach(choices => {
    choices.id = uuid();
  });
  // if choice is correct, add the choice id to correctChoiceId array
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
    if (!request.token) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const savedNewQuestion = await newQuestion.save();
    return response.json(savedNewQuestion);
  } catch (error) {
    return next(error);
  }
});
// update one USE TOKEN
router.put('/:questionId', async (request, response, next) => {
  const { questionId } = request.params;
  const question = request.body;
  // if trying update choices, correctChoicesId array needs to be changed too
  if (request.body.choices) {
    const correctChoice = request.body.choices;
    // creat new id for choices (if you want to use old choice id, fetch it from database or
    // add it to request body as "id")
    correctChoice.forEach(choices => {
      choices.id = uuid();
    });
    // if choice is correct, add the choice id to correctChoiceId array
    const choicesArray = correctChoice.map(choice =>
      choice.isCorrect ? choice.id : null
    );
    const correctChoiceId = choicesArray.filter(Boolean); // all the correct choices
    question.correctChoiceId = correctChoiceId;
  }
  try {
    if (!request.token) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      question,
      { new: true }
    );
    return response.json(updatedQuestion);
  } catch (error) {
    return next(error);
  }
});
// delete specific question USE TOKEN
router.delete('/:questionId', async (request, response, next) => {
  const { questionId } = request.params;
  try {
    if (!request.token) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const removedQuestion = await Question.deleteOne({ _id: questionId });
    return response.json(removedQuestion);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
