const db = require('../db')

module.exports = {
    getCourse: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        res.status(status).send("TODO: get info for course with id " 
                + req.params.courseId)
    },

    addCourse: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        res.status(status).send("TODO: add course")
    },

    modifyCourse: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        const payload = req.decoded;
        if (payload && payload.admin === 1) {
            res.status(status).send("TODO: update info for course with id " 
                + req.params.courseId)
        }
    },
    
    deleteCourse: (req, res) => {
        let result = {};
        let status = 200; // status code: OK

        const payload = req.decoded;
        if (payload && payload.admin === 1) {
            res.status(status).send("TODO: delete course with id " 
                + req.params.courseId)
        }
    },
}
