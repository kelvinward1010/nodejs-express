const express = require('express');
const { updateUserAnyWay, updateFollowUser } = require('../controllers/user');
const { verifyToken } = require('../middleware/jwt');


const router = express.Router()


router.put('/update-user-anyway/:id', updateUserAnyWay)
//router.put('/update-follow-user/:id', updateFollowUser)


module.exports = router