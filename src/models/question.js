const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  _id: Number,
  categoryId: Number,
  question: String,
  explanation: String,
  isSingleChoice: Boolean,
  correctChoiceId: Array,
  choices: [{ _id: Number, option: String }],
});

questionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
