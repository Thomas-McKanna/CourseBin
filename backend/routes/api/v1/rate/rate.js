const db = require('../db')

module.exports = {
    getSubmissionRating: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        res.status(status).send("TODO: get rating for submission with id " 
            + req.params.submissionId)

    },

    getContentRating: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        res.status(status).send("TODO: get rating for content with url "
            + req.params.contentUrl)
    },

    rateContent: (req, res) => {
        let result = {};
        let status = 200; // status code: OK
        
        res.status(status).send("TODO: rate content with url  " 
            + req.params.contentUrl + " with " + req.params.ratingVal)
    },
}
