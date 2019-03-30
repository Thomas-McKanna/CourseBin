var router = require('express').Router();
var multer = require('multer');

const validateToken = require('../utils').validateToken;
var upload = require('./upload');

const environment = process.env.NODE_ENV; // development
const config = require('../api_config')[environment];

multerUpload = multer({ storage: upload.storage });

router.post('/submission/:submissionId', validateToken, multerUpload.array(config.uploadFieldName, config.maxFilesUpload), 
    upload.addContent);

module.exports = router;
