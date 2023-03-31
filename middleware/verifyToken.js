const jwt = require("jsonwebtoken");
const takeError = require("../utils/takeError");

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return next(takeError(401, "You are not authenticated!"));
    }
  
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) return next(takeError(403, "Token is not valid!"));
      req.user = user;
      next();
    });
};
  
const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return next(takeError(403, "You are not authorized!"));
      }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
};

module.exports = {
    verifyToken,
    verifyUser,
    verifyTokenAndAdmin,
};