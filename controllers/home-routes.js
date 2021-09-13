const router = require("express").Router();
const { User, Post, Comment } = require("../models");

// render homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    console.log(postData);

    const blogpost = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      blogpost,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// get login screen
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
// Sign-up page

router.get("/signup", (req, res) => {
  res.render("sign-up");
});

// get post by id
router.get("/post/:id", async (req, res) => {
  const postidData = await Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "content", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  });
  if (!postidData) {
    res.status(404).json({ message: "No post found with this id" });
    return;
  }
  const postid = postidData.get({ plain: true });
  console.log(post);
  res.render("post", { post, loggedIn: req.session.loggedIn });
});

// comments
router.get("/post-comments", async (req, res) => {
  const commentsData = await Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "content", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  });
  if (!commentsData) {
    res.status(404).json({ message: "No post found with this id" });
    return;
  }
  const comments = commentsData.get({ plain: true });
  console.log(post);
  res.render("comments", { comments, loggedIn: req.session.loggedIn });
});

module.exports = router;
