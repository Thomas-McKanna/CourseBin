var router = require('express').Router();
var schools = require('./schools');

router.get('/all', schools.getAllInfo)
      .get('/names', schools.getNames);

module.exports = router;