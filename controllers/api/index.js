const router = require('express').Router();

const accountRoutes = require('./account-routes.js');
const postRoutes = require('./post-routes');

router.use('/account', accountRoutes);
router.use('/post', postRoutes);

module.exports = router;