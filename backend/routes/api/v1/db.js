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
    host: process.env.MYSQL_CONN_URL,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD, // This is the password you set up when making the database!
    database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB,
    multipleStatements: true,
  })

  state.mode = mode
  done()
}

exports.get = function() {
  return state.pool
}
