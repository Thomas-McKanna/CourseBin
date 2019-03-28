const mysql = require('mysql')

const db = require('../db')

module.exports = {
    getSubmissionRating: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        sql = "SELECT SUM(rating) total_rating FROM development.content"
            + " NATURAL JOIN development.ratings WHERE submission_id=?"
        sql = mysql.format(sql, req.params.submissionId);

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
    },

    getContentRating: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        sql = "SELECT SUM(rating) total_rating FROM development.content"
            + " NATURAL JOIN development.ratings WHERE url=?"
        sql = mysql.format(sql, req.params.contentUrl);

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
    },

    rateContent: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        if (req.params.ratingVal === "up") {
            var rating = 1;
        } else if (req.params.ratingVal === "down") {
            var rating = -1;
        } else {
            status = 400; // status code: Bad Request
            result.status = status;
            result.error = error; 
            res.status(status).send(result);
        }

        const payload = req.decoded;
        sql = "INSERT INTO ratings (submission_id, url, username, rating)"
            + " VALUES (?, ?, ?, ?)"
        var inserts = [req.params.submissionId, req.params.contentUrl, 
            payload.user, rating]
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
    },
}
