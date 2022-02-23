const winston = require('winston')
// error, warn, info, verbose, debug, silly


module.exports = function(err, req, res, next){
  //  winston.error(err.message, err)
    winston.log('error', err.message)
    res.status(500).send('something failed...........')
}