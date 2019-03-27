const db = require('../db')

module.exports = {
    getSubmission: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        res.status(status).send("TODO: get info for submission with id" 
            + req.params.submissionId)  
    },

    addSubmission: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        res.status(status).send("TODO: add submission")
    },

    modifySubmission: (req, res) => {
        let result = {};
        let status = 200; // status code: OK
        
        const payload = req.decoded;
        if (payload && payload.admin === 1) {
            res.status(status).send("TODO: update submission with id " 
                + req.params.submissionId)
        } else {
            // make sure user is modifying their own submission
        }
            
    },
    
    deleteSubmission: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        const payload = req.decoded;
        if (payload && payload.admin === 1) {
            res.status(status).send("TODO: delete submission with id " 
                + req.params.submissionId)
        } else {
            // make sure user is deleting their own submission
        }
    },
}
