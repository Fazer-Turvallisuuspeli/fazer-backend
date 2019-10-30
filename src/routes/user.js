const router = require('express').Router();
const User = require('../models/user');

// get all
router.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

// get specific user
router.get('/:userId', async (request, response, next) => {
  const { userId } = request.params;

  try {
    const selectedUser = await User.findById(userId);
    response.json(selectedUser);
  } catch (error) {
    next(error);
  }
});

// get users from specific unit
router.get('/unit/:unitId', async (request, response, next) => {
  const { unitId } = request.params;

  try {
    const selectedUsers = await User.find({ 'unit.id': unitId });
    response.json(selectedUsers);
  } catch (error) {
    next(error);
  }
});

// add new user
router.post('/', async (request, response, next) => {
  const newUser = new User({
    name: request.body.name,
    email: request.body.email,
    unit: request.body.unit,
    score: request.body.score,
  });
  try {
    const savedNewUser = await newUser.save();
    response.json(savedNewUser);
  } catch (error) {
    next(error);
  }
});

router.put('/:userId', async (request, response, next) => {
  const { userId } = request.params;
  const user = request.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });
    response.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// delete specific user
router.delete('/:userId', async (request, response, next) => {
  const { userId } = request.params;

  try {
    const removedUser = await User.remove({ _id: userId });
    response.json(removedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
