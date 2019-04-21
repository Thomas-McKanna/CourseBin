const jwt = require('jsonwebtoken');
const db = require('./db');

module.exports = {
    validateToken: (req, res, next) => {
          const authorizationHeaader = req.headers.authorization;
          let result;
          if (authorizationHeaader) {
                
              const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
              const options = {
              expiresIn: '1d',
              issuer: 'coursebin'
          };
          try {
              // verify makes sure that the token hasn't expired and has been issued by us
              result = jwt.verify(token, process.env.JWT_SECRET, options);
    
              // Let's pass back the decoded token to the request object
              req.decoded = result;
              // We call next to pass execution to the subsequent middleware
              next();
          } catch (err) {
              // Throw an error just in case anything goes wrong with verification
              throw new Error(err);
          }
        } else {
            result = { 
                error: `Authentication error. Token required.`,
                status: 401
            };
            res.status(401).send(result);
        }
    },

    getDbConnection: (req, res, next) => {
        connection = db.get()
        if (connection) {
            req.conn = connection;
            next();
        } else {
            status = 500;
            result.status = status;
            result.error = "could not connect to database";
            res.status(status).send(result);
        } 
    },
};
