var mysql = require('mysql')
var async = require('async')

var PRODUCTION_DB = 'development'
var TEST_DB = 'development'

exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

var state = {
  pool: null,
  mode: null,
}

exports.connect = function(mode, done) {
  state.pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password', // This is the password you set up when making the database!
    database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
  })

  state.mode = mode
  done()
}

exports.get = function() {
  return state.pool
}
