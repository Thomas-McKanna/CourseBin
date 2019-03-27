var router = require('express').Router();
var courses = require('./courses');

router.get('/:courseId', courses.getCourse)
        .post('/', courses.addCourse)
        .put('/:courseId', courses.modifyCourse)
        .delete('/:courseId', courses.deleteCourse);

module.exports = router;
