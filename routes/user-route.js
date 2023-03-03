const express = require('express');
const { updateUserAnyWay } = require('../controllers/user');


const router = express.Router()


router.put('/update-user-anyway', updateUserAnyWay)



module.exports = router