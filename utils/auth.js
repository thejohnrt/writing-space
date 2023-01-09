const withAuth = (req, res, next) => {
  if (!req.session.accountId) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
