const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// get all
router.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users.map(user => user.toJSON()));
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
    response.json(selectedUsers.map(user => user.toJSON()));
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
// update user
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

// delete specific user USE TOKEN
router.delete('/:userId', async (request, response, next) => {
  const { userId } = request.params;

  try {
    if (!request.token) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const removedUser = await User.remove({ _id: userId });
    return response.json(removedUser);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
