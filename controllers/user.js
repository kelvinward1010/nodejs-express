const User = require('../models/user-model');


// Update user anyway
const updateUserAnyWay = async (req, res, next) => {
    try {
        const updatedUser = User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new: true});
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
        next(error)
    }
}



module.exports = {
    updateUserAnyWay,
}