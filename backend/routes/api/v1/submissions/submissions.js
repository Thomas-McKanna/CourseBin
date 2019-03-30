const mysql = require('mysql')

const db = require('../db')

module.exports = {
    getSubmission: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        // first query for submission meta data
        sql = "SELECT S.username, C.number, C.name, C.year, C.semester, C.professor, SC.school_name"
                + " FROM submissions AS S LEFT JOIN courses AS C ON S.course_id = C.id"
                + " LEFT JOIN schools AS SC ON C.school = SC.school_code"
                + " WHERE S.id = ?"
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
            
            // second query for URLs
            sql = "SELECT C.url from content as C"
                + " LEFT JOIN submissions AS S ON C.submission_id = S.id"
                + " WHERE S.id = ?"
            sql = mysql.format(sql, req.params.submissionId);
            connection.query(sql, function (error, results, fields) {
                if (!error) {
                    status = 200;
                    result.status = status;
                    result.related_content = results;
                } else {
                    status = 404;
                    result.status = status;
                    result.error = error; 
                }
                res.status(status).send(result);
            });
        });
    },

    addSubmission: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        console.log(req.files);
        console.log(req.body);

        res.status(status).send("TODO: add submission")
    },

    modifySubmission: (req, res) => {
        let result = {};
        let status = 200; // status code: OK
        
        const payload = req.decoded;
        res.status(status).send("TODO: update submission with id " 
            + req.params.submissionId)
    },
    
    deleteSubmission: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        sql = "DELETE FROM submissions WHERE id=?"
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

    verifyOwnership: (req, res, next) => {
        let result = {};
        let status = 200; // status code: OK

        const payload = req.decoded;

        sql = "SELECT username FROM submissions WHERE id=?"
        sql = mysql.format(sql, req.params.submissionId);

        connection.query(sql, function (error, results, fields) {
            if (!error && results[0]) {
                if (payload.user === results[0]['username']
                        || payload.admin === 1) {
                    next();
                    return;
                } else {
                    result.status = 404;
                    result.result = "Authentication error."; 
                }
            } else {
                status = 404;
                result.status = status;
                result.error = "The submission may not exist."; 
            }
            res.status(status).send(result);
        });
    },
}