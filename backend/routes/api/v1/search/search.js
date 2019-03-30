const mysql = require('mysql')

const db = require('../db')

module.exports = {
    searchForSubmission: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        // each of these is optional in the search
        username_clause = '';
        number_clause = '';
        school_clause = '';
        year_clause = '';
        semester_clause = '';
        professor_clause = '';
        order_clause = ''

        // option for searching by username
        if (req.params.username !== 'none') {
            var username_clause = " WHERE username=? ";
            username_clause = mysql.format(username_clause, req.params.username);
        }

        // option for searching by course number
        if (req.params.courseNum !== 'none') {
            var number_clause = " AND number=? ";
            number_clause = mysql.format(number_clause, req.params.courseNum);
        }

        // option for searching by school code
        if (req.params.schoolCode !== 'none') {
            var school_clause = " AND school=? ";
            school_clause = mysql.format(school_clause, req.params.schoolCode);
        }

        // option for searching by year
        if (req.params.year !== 'none') {
            var year_clause = " AND year=? ";
            year_clause = mysql.format(year_clause, req.params.year);
        }

        // option for searching by semester
        if (req.params.semester !== 'none') {
            var semester_clause = " AND semester=? ";
            semester_clause = mysql.format(semester_clause, req.params.semester);
        }

        // option for ordering results
        if (req.params.orderType !== 'none') {
            if (req.params.orderType === 'date') {
                var order_clause = " ORDER BY date_created ";
            } else if (req.params.orderType === 'rating') {
                var order_clause = " ORDER BY total_rating ";
            } else {
                status = 400; // status code: Bad Request
                result.status = status;
                result.error = error; 
                res.status(status).send(result);
            }
        }

        var sql = "SELECT S_DER.id, C.name, C.number, C.professor, C.semester, C.year, total_rating FROM (SELECT * FROM submissions" + username_clause + ") AS S_DER"
            + " LEFT JOIN courses AS C ON S_DER.course_id = C.id"
            + " LEFT JOIN (SELECT submission_id, SUM(rating) total_rating FROM development.content NATURAL JOIN development.ratings) AS RCNT ON S_DER.id = RCNT.submission_id"
            + " WHERE 1=1 " + number_clause + school_clause + year_clause + semester_clause + professor_clause 
            + order_clause;

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
}
