const mysql = require('mysql')
var mkdirp = require('mkdirp')

module.exports = {
    upload: (req, res) => {
        var d = new Date();
        file = req.files.file1;
        intermediate_directory = './data/' + file.md5 + d.getTime();
        mkdirp(intermediate_directory, function(err) {
            // if any errors then print the errors to our console
            if (err) {
                res.status(500).send(err)
                return;
            }

            var storage_location = intermediate_directory
                + '/' + file.name

            // Use the mv() method to place the file somewhere on your server
            file.mv(storage_location, function(err) {
                if (err) {
                    res.status(500).send(err)
                    return;
                }
                
                let result = {};
                let status = 200; // status code: OK

                sql = "INSERT INTO content (submission_id, url)"
                    + " VALUES (?, ?)"
                var inserts = [req.params.submissionId, storage_location]
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
            });
        });
        
    },
}