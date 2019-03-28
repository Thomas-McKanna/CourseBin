const db = require('../db')

module.exports = {
    searchForSubmission: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        var opional_clause_username = (req.params.username !== " AND username = ? " ? username : null)

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
                status = 404;
                result.status = status;
                result.error = error; 
            }
            res.status(status).send(result);
        });
    },
}
