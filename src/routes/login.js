const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');

// user login
router.post('/', async (request, response) => {
  const userBody = request.body;

  const user = await User.findOne({ name: userBody.name });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(userBody.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'Invalid input' });
  }

  const userForToken = {
    name: user.name,
    id: user.id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  // console.log(userLogged, `User Token: ${token}`);
  return response.json({
    token,
    name: user.name,
    unit: user.unit,
    score: user.score,
    id: user.id,
  });
});

module.exports = router;
