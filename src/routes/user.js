const router = require('express').Router();
const User = require('../models/user');

router.get('/', async (request, response) => {
  const users = await User.find({});

  response.json(users);
});

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

module.exports = router;
