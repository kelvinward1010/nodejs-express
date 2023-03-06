const { verifyToken } = require('../middleware/jwt');
const User = require('../models/user-model');


// Update user anyway
const updateUserAnyWay = async (req, res, next) => {
    console.log(req)
    try {
        const updatedUser = User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new: true});
        res.status(201).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
        next(error)
    }
}


// Update user follow user
const updateFollowUser = async (req, res, next) => {
    if(req.body.userId === req.params.id) {
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },{new: true});
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(401).json("You can update only your account!")
    }
}


module.exports = {
    updateUserAnyWay,
    updateFollowUser,
}