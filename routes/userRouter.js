const express = require('express')
const { registerUser, loginUser, getUserDetails, logoutUser, updateUserOrders } = require('../controllers/userController')
const { isAuthenticatedUser } = require('../middleware/Auth')

const router = express.Router()

router.route('/user/signup').post(registerUser)
router.route('/user/login').post(loginUser)
router.route('/user/logout').get(logoutUser)
router.route('/user/me').get(getUserDetails)
router.route('/user/orders').post(updateUserOrders)


module.exports = router