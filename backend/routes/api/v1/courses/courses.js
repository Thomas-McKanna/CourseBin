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

    searchCourses: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        // each of these is optional in the search
        number_clause = '';
        school_clause = '';
        year_clause = '';
        semester_clause = '';

        // option for searching by course number
        if (req.params.number !== 'none') {
            var number_clause = " AND number=? ";
            number_clause = mysql.format(number_clause, req.params.number);
        }

        // option for searching by school code
        if (req.params.school !== 'none') {
            var school_clause = " AND school=? ";
            school_clause = mysql.format(school_clause, req.params.school);
        }

        // option for searching by year
        if (req.params.year !== 'none') {
            var year_clause = " AND year=? ";
            year_clause = mysql.format(year_clause, req.params.year);
        }

        // option for searching by year
        if (req.params.semester !== 'none') {
            var semester_clause = " AND semester=? ";
            semester_clause = mysql.format(semester_clause, req.params.semester);
        }

        var sql = "SELECT *"
            + " FROM courses"
            + " WHERE 1=1 " + number_clause + school_clause + year_clause + semester_clause;

        connection.query(sql, function (error, results, fields) {
            if (!error && results[0]) {
                status = 200;
                result.status = status;
                result.result = results;
            } else {
                status = 404;
                result.status = status;
                result.error = error; 
                result.message = "The search may not have produced any results."
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
