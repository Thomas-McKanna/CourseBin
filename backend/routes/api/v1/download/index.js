var router = require('express').Router();

var download = require('./download');

router.get('/:contentLocation', download.getContent);

module.exports = router;
