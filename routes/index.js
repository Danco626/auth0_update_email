const router = require('express').Router();
const homeRouter = require('./home');
const credentialsRouter = require('./credentials');

router.use('/', homeRouter);
router.use('/', credentialsRouter);


module.exports = router;

