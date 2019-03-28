const mysql = require('mysql')

module.exports = {
    upload: (req, res) => {
        console.log(req.files)
        res.send("got the files");
    },
}