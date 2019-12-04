const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Info = require('../models/info');

// get all infos
router.get('/', async (request, response) => {
  const infos = await Info.find({});
  response.json(infos.map(info => info.toJSON()));
});

router.get('/welcomeMessage', async (request, response) => {
  const welcomeMessage = await Info.find({}, 'welcomeMessage');
  response.json(welcomeMessage[0].welcomeMessage);
});

router.get('/units', async (request, response) => {
  const units = await Info.find({}, 'units');
  response.json(units[0].units);
});

router.get('/instructions', async (request, response) => {
  const instructions = await Info.find({}, 'instructions');
  response.json(instructions[0].instructions);
});

// post new info, token needed
router.post('/', async (request, response) => {
  const newInfo = new Info({
    welcomeMessage: request.body.welcomeMessage,
    units: request.body.units,
    instructions: request.body.instructions,
  });
  try {
    if (!request.token) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const savedNewInfo = await newInfo.save(); // save in mongodb
    return response.json(savedNewInfo); // response with saved post
  } catch (err) {
    return response.json({ message: err });
  }
});

// update info, token needed
router.put('/:id', async (request, response, next) => {
  const { id } = request.params;
  const info = request.body;

  try {
    if (!request.token) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const updatedInfo = await Info.findOneAndUpdate(id, info, { new: true });
    return response.json(updatedInfo);
  } catch (error) {
    return next(error);
  }
});

// delete info, token needed
router.delete('/:id', async (request, response, next) => {
  const { id } = request.params;
  try {
    if (!request.token) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const removedInfo = await Info.deleteOne({ _id: id });
    return response.json(removedInfo);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
