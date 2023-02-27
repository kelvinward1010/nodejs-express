const jwt = require('jsonwebtoken');
const takeError = require('../utils/takeError');

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if(!token) return next(takeError(401, "You are not authenticated!"))

    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
        if(err) return next(takeError(403, "Token is not valid!"))
        req.userId = payload.indexOf;
        next()
    })
}

module.exports = {
    verifyToken,
}