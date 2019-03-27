var router = require('express').Router();
const validateToken = require('../utils').validateToken;
var users = require('./users');

router.get('/:username', users.getUserInfo)
        .post('/', users.addUser)
        .post('/login', users.login)
        .put('/update/:oldUsername/:newUsername', users.updateUsername)
        .delete('/:username', validateToken, users.deleteUser);

module.exports = router;
