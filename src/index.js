require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes');

const config = require('./utils/config');
const { tokenExtractor, errorHandler } = require('./utils/middleware');

const app = express();

// Application-level middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database
console.log('Connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Error connection to MongoDB:', error.message);
  });

app.use(tokenExtractor);

// Routes
app.use('/api/users', routes.user);
app.use('/api/categories', routes.category);

// Application-level middleware for unrecognized routes
app.use(errorHandler);

// Start
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
