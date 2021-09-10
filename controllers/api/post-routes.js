const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const { post } = require("./user-routes");

// /api/post

// new blog post
router.post("/newPost", async (req, res) => {
  // validating username
  const postData = await User.findOne({
    where: { username: req.body.username },
  });

  if (!postData) {
    res
      .status(400)
      .json({ message: "Incorrect username or password. Please try again." });
    return;
  }
  const blogData = {
    title: req.body.title,
    content: req.body.content,
    user_id: postData.id,
  };
  res.render("home");

  const newPost = await Post.create(blogData);
});

// delete blog post route delete a blog post by its 'id' value
router.delete("/:id", async (req, res) => {
  try {
    const PostData = await Post.destroy({
      where: { id: req.params.id },
    });

    // if wrong id entered
    if (!PostData) {
      res.status(404).json({ message: "no blog post associated with this id" });
    } else {
      console.log(`\n Deleting blog post with id: ${req.params.id} \n`);
      res.status(200).json(PostData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// edit blog post route by its 'id' value
router.put("/:id", async (req, res) => {
  try {
    const PostData = await Post.update(
      // set all attributes of blog posts to values passed in to req.body
      {
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id,
      },
      { where: { id: req.params.id } }
    );

    // if wrong id entered
    if (!PostData) {
      res.status(404).json({ message: "no blog post found with this id" });
    } else {
      console.log(`\n Editing blog post record id: ${req.params.id} \n`);
      res.status(200).json(PostData);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
