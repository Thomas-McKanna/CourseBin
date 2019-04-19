var router = require('express').Router();
const validateToken = require('../utils').validateToken;
var courses = require('./courses');

router.get('/:courseId', courses.getCourse)
        .get('/number/:number/school/:school/year/:year/semester/:semester',
                courses.searchCourses)
        .post('/', validateToken, courses.addCourse)
        .put('/', validateToken, courses.modifyCourse)
        .delete('/:courseId', validateToken, courses.deleteCourse);

module.exports = router;
