var router = require('express').Router();

var rate = require('./rate');
const validateToken = require('../utils').validateToken;

router.get('/submission/:submissionId', rate.getSubmissionRating)
        .get('/content/:contentUrl', rate.getContentRating)
        .get('/content/:contentUrl/submission/:submissionId/rating/:ratingVal', 
                validateToken, rate.rateContent);

module.exports = router;
