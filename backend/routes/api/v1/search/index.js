var router = require('express').Router();

var search = require('./search');

router.get('/course/:courseNum/school/:schoolCode/time/:semester/:year/' 
                + 'user/:username/order/:orderType', 
    search.searchForSubmission);

module.exports = router;
