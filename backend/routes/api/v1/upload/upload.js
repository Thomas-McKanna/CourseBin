const mysql = require('mysql')
const multer = require('multer')

module.exports = {
    addContent: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        const sql_template = "INSERT INTO content (submission_id, url, filename)"
            + " VALUES (?, ?, ?);";
        var sql_intermediate = "";
        var sql = "";

        for (entry in req.files) {
            inserts = [req.params.submissionId, req.files[entry].filename, 
                req.files[entry].originalname];
            sql_intermediate = mysql.format(sql_template, inserts);
            sql += sql_intermediate;
        }

        connection.query(sql, function (error, results, fields) {
            if (!error) {
                status = 200;
                result.status = status;
                result.message = "Files uploaded!";
            } else {
                status = 500;
                result.status = status;
                result.error = error; 
            }
            res.status(status).send(result);
        });
    },

    storage: multer.diskStorage({
        destination: function (req, file, next) {

            next(null, './data/')
        },
    }),
}
