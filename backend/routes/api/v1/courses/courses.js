const mysql = require('mysql')

const db = require('../db')

module.exports = {
    getCourse: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        var sql = "SELECT number, name, year, semester, professor, school_name"
            + " FROM courses AS c LEFT JOIN schools AS s ON c.school = s.school_code"
            + " WHERE c.id = ?"
            var inserts = [req.params.courseId];
            sql = mysql.format(sql, inserts);

        connection.query(sql, function (error, results, fields) {
            if (!error && results[0]) {
                status = 200;
                result.status = status;
                result.result = results;
            } else {
                status = 404;
                result.status = status;
                result.error = error; 
                result.message = "Course may not exist."
            }
            res.status(status).send(result);
        });
    },

    addCourse: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        var sql = "INSERT INTO courses (number, name, year, semester, professor, school)"
            + " VALUES (?, ?, ?, ?, ?, ?)"
            var inserts = [req.body.number,
                           req.body.name,
                           req.body.year,
                           req.body.semester,
                           req.body.professor,
                           req.body.schoolCode];
            sql = mysql.format(sql, inserts);

        connection.query(sql, function (error, results, fields) {
            if (!error) {
                status = 200;
                result.status = status;
                result.result = results;
            } else {
                status = 500;
                result.status = status;
                result.error = error; 
            }
            res.status(status).send(result);
        });
    },

    modifyCourse: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        const payload = req.decoded;
        if (payload && payload.admin === 1) {
            var sql = "UPDATE courses SET number=?, name=?, year=?, semester=?," 
                + " professor=?, school=? WHERE id = ?" 
            var inserts = [req.body.number,
                           req.body.name,
                           req.body.year,
                           req.body.semester,
                           req.body.professor,
                           req.body.schoolCode,
                           req.body.id];
            sql = mysql.format(sql, inserts);

            connection.query(sql, function (error, results, fields) {
                if (!error) {
                    status = 200;
                    result.status = status;
                    result.result = results;
                } else {
                    status = 500;
                    result.status = status;
                    result.error = error;
                }
                res.status(status).send(result);
            });
        }
    },
    
    deleteCourse: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        const payload = req.decoded;
        if (payload && payload.admin === 1) {
            var sql = "DELETE FROM courses WHERE id = ?" 
            var inserts = [req.params.courseId];
            sql = mysql.format(sql, inserts);

            connection.query(sql, function (error, results, fields) {
                if (!error && result[0]) {
                    status = 200;
                    result.status = status;
                    result.result = results;
                } else {
                    status = 404;
                    result.status = status;
                    result.error = error;
                    result.message = "Course may not exist."
                }
                res.status(status).send(result);
            });
        }
    },
}
