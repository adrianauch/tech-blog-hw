const router = require("express").Router();
const { User, BlogPost, Comment } = require("../models");

// render homepage
router.get("/", async (req, res) => {
  try {
    //get all blog posts and JOIN with user
    const blogData = await Post.findAll({
      include: [{ model: User }],
    });

    //serialize data so template can read it
    // need to map over it because this is an array of objects
    const bp = blogData.map((post) => post.get({ plain: true }));

    // pass serialized data into template
    // render 'home' view and pass bp data into it
    res.render("home", { bp });
  } catch (err) {
    res.status(500).json(err);
  }
});
