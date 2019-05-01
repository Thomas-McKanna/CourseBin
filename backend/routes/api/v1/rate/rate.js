const mysql = require('mysql')

const db = require('../db')

module.exports = {
    getSubmissionRating: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        sql = "SELECT rating FROM development.content"
            + " NATURAL JOIN development.ratings WHERE submission_id=?"
        sql = mysql.format(sql, req.params.submissionId);

        connection.query(sql, function (error, results, fields) {
            if (!error && results[0]) {
                status = 200;
                sum = 0
                for (r in results) {
                    sum += results[r]['rating']
                }
                result.status = status;
                result.result = parseInt(Math.round(sum / results.length));
            } else {
                status = 404;
                result.status = status;
                result.error = error; 
                result.message = "Submission may not exist."
            }
            res.status(status).send(result);
        });
    },

    getContentRating: (req, res) => {
        let result = {};
        let status = 200; // status code: OK
        
        sql = "SELECT rating FROM development.content"
            + " NATURAL JOIN development.ratings WHERE url=?"
        sql = mysql.format(sql, req.params.contentUrl);

        connection.query(sql, function (error, results, fields) {
            if (!error && results[0]) {
                status = 200;
                sum = 0
                for (r in results) {
                    sum += results[r]['rating']
                }
                result.status = status;
                result.result = parseInt(Math.round(sum / results.length));
            } else {
                status = 404;
                result.status = status;
                result.error = error; 
                result.message = "Content may not exist."
            }
            res.status(status).send(result);
        });
    },

    rateContent: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        const payload = req.decoded;
        sql = "INSERT INTO ratings (submission_id, url, username, rating)"
            + " VALUES (?, ?, ?, ?)"
        var inserts = [req.params.submissionId, req.params.contentUrl, 
            payload.user, req.params.ratingVal]
        sql = mysql.format(sql, inserts);

        connection.query(sql, function (error, results, fields) {
            if (!error) {
                status = 200;
                result.status = status;
                result.result = results;
                res.status(status).send(result);
            } else {
                sql = "UPDATE ratings "
                    + " SET rating=?"
                    + " WHERE submission_id=? AND url=? AND username=?"
                var inserts = [req.params.ratingVal, req.params.submissionId, 
                    req.params.contentUrl, payload.user]
                sql = mysql.format(sql, inserts);
                console.log(sql)

                // If user already rated this content, update their rating
                connection.query(sql, function (error, results, fields) {
                    if (!error) {
                        status = 200;
                        result.status = status;
                        result.result = results;
                    } else {
                        console.log("here")
                        status = 500;
                        result.status = status;
                        result.error = error; 
                    }
                    res.status(status).send(result);
                });
            }

        });
    },
}
