const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  unit: {
    id: String,
    name: String,
  },
  score: {
    overall: Number,
    perCategory: [{ categoryId: String, points: Number }],
  },
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const User = mongoose.model('User', userSchema);

module.exports = User;
