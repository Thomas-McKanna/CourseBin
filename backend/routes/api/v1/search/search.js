const db = require('../db')

module.exports = {
    searchForSubmission: (req, res) => {
        let result = {};
        let status = 200; // status code: OK
        connection = db.get()
        res.status(status).send("TODO: search for submission with params " 
            + req.params.toString())
    },
}
