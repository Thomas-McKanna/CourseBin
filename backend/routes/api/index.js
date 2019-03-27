var router = require('express').Router();
const getConn = require('./v1/utils').getDbConnection;

router.use(getConn);
router.use('/v1', require('./v1'));

module.exports = router;
