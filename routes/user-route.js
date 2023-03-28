const express = require('express');
const { updateUserAnyWay, updateFollowUser, getUserById, getUsers, deleteUser } = require('../controllers/user');
const { verifyToken } = require('../middleware/jwt');


const router = express.Router()


router.put('/update-user-anyway/:id', updateUserAnyWay)
//router.put('/update-follow-user/:id', updateFollowUser)
router.get('/get-user/:id', getUserById);
router.get('/get-all-user', getUsers);
router.delete('/delete-user/:id', deleteUser);


module.exports = router