var router = require('express').Router();

router.use('/courses', require('./courses'));
router.use('/rate', require('./rate'));
router.use('/search', require('./search'));
router.use('/submissions', require('./submissions'));
router.use('/users', require('./users'));

module.exports = router;
