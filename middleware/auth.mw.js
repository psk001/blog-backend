const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token')
    
    if(!token) return res.status(401).send('unauthorized access')

    try{
        const decoded = jwt.verify(token, 'private')
        req.user = decoded
        next()
    }catch(ex){
        res.status(400).send('invalid token...')        
    }
}


//module.exports=auth