const router = require('express').Router();
const Info = require('../models/info');

// get all
router.get('/', async (request, response) => {
  const info = await Info.find({});
  response.json(info);
});

router.get('/welcomeMessage', async (request, response) => {
  const info = await Info.find({}, 'welcomeMessage');
  response.json(info);
});

router.get('/units', async (request, response) => {
  const info = await Info.find({}, 'units');
  response.json(info);
});

router.get('/instructions', async (request, response) => {
  const info = await Info.find({}, 'instructions');
  response.json(info);
});

// post new information
router.post('/', async (req, res) => {
  const newInfo = new Info({
    welcomeMessage: req.body.welcomeMessage,
    units: req.body.units,
    instructions: req.body.instructions,
  });
  try {
    const savedNewInfo = await newInfo.save(); // save in mongodb
    res.json(savedNewInfo); // response with saved post
  } catch (err) {
    res.json({ message: err });
  }
});

// update info
router.put('/', async (request, response, next) => {
  const info = request.body;

  try {
    const updatedInfo = await Info.findOneAndUpdate({}, info, { new: true });
    response.json(updatedInfo);
  } catch (error) {
    next(error);
  }
});

// delete info
router.delete('/', async (request, response, next) => {
  try {
    const removedInfo = await Info.remove();
    response.json(removedInfo);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
