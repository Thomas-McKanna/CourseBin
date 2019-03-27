var router = require('express').Router();
var submissions = require('./submissions');

router.get('/:submissionId', submissions.getSubmission)
        .post('/', submissions.addSubmission)
        .put('/:submissionId', submissions.modifySubmission)
        .delete('/:submissionId', submissions.deleteSubmission);

module.exports = router;