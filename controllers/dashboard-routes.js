const router = require("express").Router();
const { Post } = require("../models/");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      accountId: req.session.accountId
    },
    order: [
      ["created_at", "DESC"]
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      res.render("all-posts-admin", {
        layout: "dashboard",
        posts,
        loggedIn: req.session.loggedIn,
        pageName: "Your Posts"
      });
    })
    .catch(err => {
      console.log(err);
      res.redirect("login");
    });
});

router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {
    layout: "dashboard",
    loggedIn: req.session.loggedIn,
    pageName: "New Post"
  });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Post.findByPk(req.params.id)
    .then(dbPostData => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render("edit-post", {
          layout: "dashboard",
          post,
          loggedIn: req.session.loggedIn,
          pageName: `Edit "${post.title}"`
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
