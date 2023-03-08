const express = require('express');
const { updateUserAnyWay, updateFollowUser, getUserById, getUsers } = require('../controllers/user');
const { verifyToken } = require('../middleware/jwt');


const router = express.Router()


router.put('/update-user-anyway/:id', updateUserAnyWay)
//router.put('/update-follow-user/:id', updateFollowUser)
router.get('/get-user/:id', getUserById);
router.get('/get-all-user', getUsers)


module.exports = router