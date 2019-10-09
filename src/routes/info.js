const router = require('express').Router();
const Info = require('../models/info');

// get all
router.get('/', async (request, response) => {
  const info = await Info.find({});
  response.json(info);
});

// post new information
router.post('/', async (req, res) => {
  const newInfo = new Info({
    // create object for saved in db
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
//* *HUOM. updates all fields
//* *should maeby check for empty fields?
router.patch('/', async (request, response, next) => {
  try {
    const updatedInfo = await Info.updateOne({
      $set: {
        welcomeMessage: request.body.welcomeMessage,
        units: request.body.units,
        instructions: request.body.instructions,
      },
    });
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
