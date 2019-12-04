const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

// get all admin users, token needed
router.get('/', async (request, response, next) => {
  try {
    if (!request.token) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const admin = await Admin.find({});
    return response.json(admin);
  } catch (error) {
    return next(error);
  }
});

// get specific admin user with id, token needed
router.get('/:userId', async (request, response, next) => {
  const { userId } = request.params;
  try {
    if (!request.token) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const selectedUser = await Admin.findById(userId);
    return response.json(selectedUser);
  } catch (error) {
    return next(error);
  }
});

// add new admin user, token needed (only admins can add new admins)
router.post('/', async (request, response, next) => {
  const userPassword = request.body.password;
  const salt = 4;
  const newPasswordHash = await bcrypt.hash(userPassword, salt); // create new passwordhash, that's stored in db
  // create admin user that is stored in db
  const newUser = new Admin({
    name: request.body.name,
    passwordHash: newPasswordHash,
    email: request.body.email,
    unit: request.body.unit,
  });

  try {
    if (!request.token) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    // put new user in database
    const savedNewUser = await newUser.save();
    return response.json(savedNewUser);
  } catch (error) {
    return next(error);
  }
});

// update specific admin user, token needed
router.put('/:userId', async (request, response, next) => {
  const { userId } = request.params;
  const user = request.body;

  try {
    if (!request.token) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    // find the user by id and updates
    const updatedUser = await Admin.findByIdAndUpdate(userId, user, {
      new: true,
    });
    return response.json(updatedUser);
  } catch (error) {
    return next(error);
  }
});
// could use js spread..
// update admin user password, token needed
router.put('/:userId/change-password', async (request, response, next) => {
  const { userId } = request.params;
  const { password } = request.body;
  const salt = 4;
  const passwordHash = await bcrypt.hash(password, salt);
  const user = { passwordHash };
  try {
    if (!request.token) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const updatedUser = await Admin.findByIdAndUpdate(userId, user, {
      new: true,
    });
    return response.json(updatedUser);
  } catch (error) {
    return next(error);
  }
});

// delete specific user, token needed
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

    const removedUser = await Admin.deleteOne({ _id: userId });
    return response.json(removedUser);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
