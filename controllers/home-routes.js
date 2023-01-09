const router = require("express").Router();
const { Post, Account } = require("../models/");

// get all posts for homepage
router.get("/", (req, res) => {
  Post.findAll({
    include: [Account],
    order: [
      ["created_at", "DESC"]
    ]
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      res.render("all-posts", {
        posts,
        loggedIn: req.session.loggedIn,
        pageName: "Home"
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// get single post
router.get("/post/:id", (req, res) => {
  Post.findByPk(req.params.id, {
    include: [
      Account,
    ],
  })
    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render("single-post", {
          post,
          loggedIn: req.session.loggedIn,
          pageName: post.title
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login", {
    pageName: "Log In"
  });
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup", {
    pageName: "Sign Up"
  });
});

module.exports = router;
