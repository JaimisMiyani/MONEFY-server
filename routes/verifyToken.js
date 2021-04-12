const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

    // verify token

    const token = req.header('token');
    
    if(!token) {
        res.status(400).json({error : 'Access Denied'});
        return;
    }

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch(error){
        res.status(400).json({error : 'Invalid Token'});
    }
}