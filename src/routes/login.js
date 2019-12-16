const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const Admin = require('../models/admin');

// user login, only for admin users
router.post('/', async (request, response) => {
  const userBody = request.body;

  const user = await Admin.findOne({ name: userBody.name });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(userBody.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(403).json({ error: 'Invalid username or password' });
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
    id: user.id,
  });
});

module.exports = router;
