const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  _id: Number,
  name: String,
  instructions: [{ title: String, body: String }],
});

categorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
