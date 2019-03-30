const mysql = require('mysql');

module.exports = {
    getContent: (req, res) => {
        sql = "SELECT filename FROM content WHERE url=?";
        sql = mysql.format(sql, req.params.contentLocation);

        connection.query(sql, function (error, results, fields) {
            if (!error && results[0]) {
                console.log();
                res.status(200).download("./data/" + req.params.contentLocation,
                    results[0].filename);
                return;
            } else {
                res.status(404).send("Not found");
            }
        });
        
    },
}