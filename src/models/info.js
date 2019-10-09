const mongoose = require('mongoose');

const infoSchema = mongoose.Schema({
  welcomeMessage: [{ title: String, body: String }],
  units: [{ _id: Number, name: String }],
  instructions: [{ title: String, body: String }],
});

infoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const Info = mongoose.model('Info', infoSchema);

module.exports = Info;
