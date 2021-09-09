const { Post } = require("../models");

const postData = [
  {
    title: "Blog",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    user_id: 1,
  },
  {
    title: "Post",
    content: "Amet aliquam id diam maecenas ultricies mi eget mauris pharetra.",
    user_id: 2,
  },
  {
    title: "One",
    content: "Ut etiam sit amet nisl purus in mollis.",
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
