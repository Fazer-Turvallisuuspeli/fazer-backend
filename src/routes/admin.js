const router = require('express').Router();
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

// get all
router.get('/', async (request, response) => {
  const admin = await Admin.find({});
  response.json(admin);
});

// get specific user
/*
router.get('/:userId', async (request, response, next) => {
  const { userId } = request.params;

  try {
    const selectedUser = await User.findById(userId);
    response.json(selectedUser);
  } catch (error) {
    next(error);
  }
});
*/
// add new admin user
router.post('/', async (request, response, next) => {
  const userPassword = request.body.password;
  const salt = 4;
  const newPasswordHash = await bcrypt.hash(userPassword, salt);

  const newUser = new Admin({
    name: request.body.name,
    passwordHash: newPasswordHash,
    email: request.body.email,
    unit: request.body.unit,
  });

  try {
    const savedNewUser = await newUser.save();
    response.json(savedNewUser);
  } catch (error) {
    next(error);
  }
});
/*
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
*/
// delete specific user
router.delete('/:userId', async (request, response, next) => {
  const { userId } = request.params;

  try {
    const removedUser = await Admin.remove({ _id: userId });
    response.json(removedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
