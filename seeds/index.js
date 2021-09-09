const { User } = require("../models");

const userData = [
  {
    username: "Adrian",
    password: "pass123",
  },
  {
    username: "Benny",
    password: "Bennoodles",
  },
  {
    username: "Benoit",
    password: "beignets",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
