var router = require('express').Router();
var rate = require('./rate');

router.get('/submission/submissionId', rate.getSubmissionRating)
        .get('/content/:contentUrl', rate.getContentRating)
        .post('/content/:contentUrl/rating/:ratingVal', rate.rateContent);

module.exports = router;
