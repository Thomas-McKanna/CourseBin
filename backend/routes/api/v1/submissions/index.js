var router = require('express').Router();

const validateToken = require('../utils').validateToken;

var submissions = require('./submissions');

router.get('/:submissionId', submissions.getSubmission)
        .post('/', validateToken, submissions.addSubmission)
        .put('/:submissionId', validateToken, submissions.modifySubmission)
        .delete('/:submissionId', validateToken, submissions.deleteSubmission);

module.exports = router;