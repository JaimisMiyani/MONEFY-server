const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

    // verify token

    const token = req.header('token-name');
    
    if(!token) {
        res.status(400).send('Access Denied');
        return;
    }

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch(error){
        res.status(400).send('Invalido Token');
    }
}