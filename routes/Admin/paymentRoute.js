const express = require('express')
const { sendStripeApiKey , processPayment } = require('../../controllers/Admin/paymentController')
const router = express.Router()
// const { isAuthenticatedUser } = require('../middleware/Auth')


router.route("/process/payment").post(processPayment)
router.route("/stripeapikey").get(sendStripeApiKey);


module.exports = router
