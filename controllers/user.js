const User = require('../models/user-model');
const bcrypt = require('bcrypt');


// Update user anyway
const updateUserAnyWay = async (req, res) => {

    try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        next(err);
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

const deleteUser = async (req,res,next)=>{
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
}

const getUserById = async (req,res, next) => {
    try {
        const user = await User.findById(req.params.id)
        const {password,...others} = user._doc;
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
        next(error)
    }
}

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    updateUserAnyWay,
    updateFollowUser,
    deleteUser,
    getUserById,
    getUsers,
}