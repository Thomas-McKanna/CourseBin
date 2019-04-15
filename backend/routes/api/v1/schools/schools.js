const mysql = require('mysql')

module.exports = {
    getAllInfo: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        var sql = "SELECT *"
            + " FROM schools"
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
                result.message = "An error occured in the database."
            }
            res.status(status).send(result);
        });
    },

    getNames: (req, res) => {
        let result = {};
        let status = 200; // status code: OK
        var sql = "SELECT school_code, school_name"
            + " FROM schools"
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
                result.message = "An error occured in the database."
            }
            res.status(status).send(result);
        });
    },
}
