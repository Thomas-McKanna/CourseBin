var express = require('express');
var db = require('../db.js')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  
  connection = db.get()
  connection.query('SELECT * FROM `users`', function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
    res.json(results)
  });
});

module.exports = router;