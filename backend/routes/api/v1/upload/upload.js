const mysql = require('mysql')
const multer = require('multer')

module.exports = {
    addContent: (req, res) => {
        console.log(req.body)
        res.status(200).send(req.body);
    },

    storage: multer.diskStorage({
        destination: function (req, file, next) {

            next(null, './data/')
        },
    }),
}