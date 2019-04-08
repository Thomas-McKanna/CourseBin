const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../db');

const environment = process.env.NODE_ENV; // development
const stage = require('../api_config')[environment];

module.exports = {
    getUserInfo: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        res.status(status).send("TODO: get " 
            + req.params.username + "'s information")
    },

    addUser: (req, res) => {
        let result = {};
        let status = 201; // status code: Created

        const username = req.body.username;
        const password = req.body.password;

        bcrypt.hash(password, stage.saltingRounds, function(err, hash) {
            if (!err) {
                var sql = "INSERT INTO users (username, hash, student_flag, "
                    + "admin_flag) VALUES (?, ?, 1, 0)"
                var inserts = [username, hash];
                sql = mysql.format(sql, inserts);

                req.conn.query(sql, function (error, results, fields) {
                    if (!error) {
                        result.status = status;
                        result.result = "user created";
                    } else {
                        status = 500;
                        result.status = status;
                        result.error = error;
                    }
                    res.status(status).send(result);
                }); 
            } else {
                console.log(stage.saltingRounds);
                result.status = 500;
                result.error = err;
                res.status(status).send(result);
            }   
        });        
    },

    login: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        const username = req.body.username;
        const password = req.body.password;

        var sql = "SELECT hash, admin_flag FROM users WHERE username = ?"
        var inserts = [username];
        sql = mysql.format(sql, inserts);

        req.conn.query(sql, function (error, results, fields) {
            if (!error && results[0]) {
                bcrypt.compare(password, results[0].hash).then(match => {
                    if (match) {
                        // Create a token
                        const payload = { user: username, 
                                        admin: results[0].admin_flag };
                        const options = { expiresIn: '1d', issuer: 'coursebin' };
                        const secret = process.env.JWT_SECRET;
                        const token = jwt.sign(payload, secret, options);
        
                        result.token = token;
                        result.status = status;
                        result.result = username;
                        res.status(status).cookie('auth', token);
                    } else {
                        status = 401;
                        result.status = status;
                        result.error = 'Authentication error';
                    }
                    res.status(status).send(result);
                }).catch(err => {
                    status = 500;
                    result.status = status;
                    result.error = err;
                    res.status(status).send(result);
                });
            } else {
                status = 404;
                result.status = status;
                result.error = error;
                res.status(status).send(result);
            }
        });
    },

    updateUsername: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        const payload = req.decoded;
        if (payload && payload.admin === 1) {
            res.status(status).send("TODO: update username from " 
                + req.params.oldUsername + " to " + req.params.newUsername)
        } else {
            // make sure the user is updating their own username
        }
    },
    
    deleteUser: (req, res) => {
        let result = {};
        let status = 200; // status code: OK
        
        const payload = req.decoded;
        if (payload && payload.admin === 1) {
            var sql = "DELETE FROM users WHERE username = ?"
            var inserts = [req.params.username];
            sql = mysql.format(sql, inserts);

            connection.query(sql, function (error, results, fields) {
                if (!error) {
                    status = 200;
                    result.status = status;
                    result.result = results;
                } else {
                    status = 404;
                    result.status = status;
                    result.error = error; 
                }
                res.status(status).send(result);
            });
        } else {
            status = 401;
            result.status = status;
            result.error = 'Authentication error';
            res.status(status).send(result);
        } 
    },
}
