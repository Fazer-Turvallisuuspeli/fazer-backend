/**
 * @TODO Replace with MongoDB (mongoose) models
 */
const users = require('./user');
const categories = require('./category');
const info = require('./info');
const questions = require('./question');

module.exports = {
  users,
  categories,
  info,
  questions,
};
