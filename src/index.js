require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const tunnel = require('tunnel-ssh');

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

// in development use tunnel-ssh to connect mongodb in school server
const tunnelConfig = {
  username: config.TUNNEL_USERNAME,
  password: config.TUNNEL_PASSWORD,
  host: config.TUNNEL_HOST,
  port: 22,
  dstPort: 27017, // mongodb default port
};

tunnel(tunnelConfig, async (error, server) => {
  // Initial tunnel connection error
  if (error) {
    console.error('Tunnel Connection Error:', error.message);
  }

  // Tunnel connection error
  server.on('error', err => {
    console.error('Tunnel Error:', err.message);
  });

  // Connect to MongoDB
  try {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
    // Initial MongoDB connection error
  } catch (err) {
    console.error('Error connection to MongoDB:', err.message);
  }
});

// MongoDB connection error
mongoose.connection.on('error', err => {
  console.error('Mongoose Error:', err.message);
});

app.use(tokenExtractor);

// Routes
app.use('/api/v1/game/info', routes.info);
app.use('/api/v1/game/users', routes.user);
app.use('/api/v1/game/categories', routes.category);
app.use('/api/v1/game/questions', routes.question);
app.use('/api/v1/game/login', routes.login);
app.use('/api/v1/game/admin', routes.admin);

// Application-level middleware for unrecognized routes
app.use(errorHandler);

// Start
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
