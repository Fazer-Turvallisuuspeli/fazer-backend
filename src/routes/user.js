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
  const userIdNum = parseInt(userId, 10);

  try {
    const selectedUser = await User.findById(userIdNum);
    response.json(selectedUser);
  } catch (error) {
    next(error);
  }
});

// get users from specific unit
//* *HUOM. finds by unit id, should it find by name?
//* *is this even necessary?
router.get('/unit/:unitId', async (request, response, next) => {
  const { unitId } = request.params;
  const unitIdNum = parseInt(unitId, 10);

  try {
    const selectedUsers = await User.find({ 'unit._id': unitIdNum });
    response.json(selectedUsers);
  } catch (error) {
    next(error);
  }
});

// insert many

// add new user
router.post('/', async (request, response, next) => {
  const newUser = new User({
    _id: request.body._id,
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
//* *HUOM. updates all fields
//* *should maeby check for empty fields?
router.patch('/:userId', async (request, response, next) => {
  const { userId } = request.params;
  const userIdNum = parseInt(userId, 10);

  try {
    const updatedUser = await User.updateOne(
      { _id: userIdNum },
      {
        $set: {
          name: request.body.name,
          email: request.body.email,
          unit: request.body.unit,
          score: request.body.score,
        },
      }
    );
    response.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// delete specific user
router.delete('/:userId', async (request, response, next) => {
  const { userId } = request.params;
  const userIdNum = parseInt(userId, 10);

  try {
    const removedUser = await User.remove({ _id: userIdNum });
    response.json(removedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
