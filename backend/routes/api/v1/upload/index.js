var router = require('express').Router();
var multer = require('multer');

const validateToken = require('../utils').validateToken;
var upload = require('./upload');

multerUpload = multer({ storage: upload.storage });

router.post('/:submissionId', validateToken, multerUpload.array('files', 10), 
    upload.addContent);

module.exports = router;
