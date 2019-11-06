if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

let { PORT, MONGODB_URI } = process.env;

const { TUNNEL_USERNAME, TUNNEL_PASSWORD, TUNNEL_HOST } = process.env;

if (process.env.NODE_ENV === 'test') {
  PORT = process.env.TEST_PORT;
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
  MONGODB_URI,
  PORT,
  TUNNEL_USERNAME,
  TUNNEL_PASSWORD,
  TUNNEL_HOST,
};
