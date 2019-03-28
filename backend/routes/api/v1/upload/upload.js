const mysql = require('mysql')
var mkdirp = require('mkdirp')

module.exports = {
    upload: (req, res) => {
        var d = new Date();
        for (file in req.files) {
            intermediate_directory = './data/' + req.files[file].md5 + d.getTime();
            mkdirp(intermediate_directory, function(err) {
                // if any errors then print the errors to our console
                if (err) {
                    res.status(500).send(err)
                    return;
                } 

                // else print a success message.
                console.log("Successfully created directory", intermediate_directory);

                intermediate_directory = './data/' + req.files[file].md5 + d.getTime();
                var storage_location = intermediate_directory
                    + '/' + req.files[file].name

                // Use the mv() method to place the file somewhere on your server
                req.files[file].mv(storage_location, function(err) {
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
        }
        
    },
}