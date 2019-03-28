var router = require('express').Router();
var fileUpload = require('express-fileupload')

const validateToken = require('../utils').validateToken;
var upload = require('./upload');

router.post('/', validateToken, fileUpload(), upload.upload);

module.exports = router;
