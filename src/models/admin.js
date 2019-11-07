const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  unit: {
    id: String,
    name: String,
  },
});

adminSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
