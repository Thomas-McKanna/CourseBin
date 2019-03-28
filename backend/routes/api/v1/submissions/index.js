var router = require('express').Router();

const validateToken = require('../utils').validateToken;
const verifyOwnership = require('./submissions').verifyOwnership;

var submissions = require('./submissions');

router.get('/:submissionId', submissions.getSubmission)
        .post('/', validateToken, submissions.addSubmission)
        .put('/:submissionId', validateToken, verifyOwnership, submissions.modifySubmission)
        .delete('/:submissionId', validateToken, verifyOwnership, submissions.deleteSubmission);

module.exports = router;