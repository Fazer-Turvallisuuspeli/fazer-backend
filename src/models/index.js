/**
 * @TODO Replace with MongoDB (mongoose) models
 */

const users = [
  {
    name: 'John Doe',
    age: 27,
    id: 1,
  },
  {
    name: 'Jane Doe',
    age: 34,
    id: 2,
  },
];

const categories = [
  {
    name: 'Lorem, ipsum.',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, tempora.',
    id: 1,
  },
  {
    name: 'Lorem, ipsum dolor.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, rem delectus!',
    id: 2,
  },
];

module.exports = {
  users,
  categories,
};
