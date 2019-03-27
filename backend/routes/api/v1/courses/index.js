var router = require('express').Router();
const validateToken = require('../utils').validateToken;
var courses = require('./courses');

router.get('/:courseId', courses.getCourse)
        .post('/', validateToken, courses.addCourse)
        .put('/:courseId', validateToken, courses.modifyCourse)
        .delete('/:courseId', validateToken, courses.deleteCourse);

module.exports = router;
