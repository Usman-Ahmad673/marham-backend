const catchAsyncErrors = require('../../middleware/catchAsyncError')
const dotenv = require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
console.log(process.env.STRIPE_SECRET_KEY);
console.log(process.env.STRIPE_API_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.body.amount);
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "USD",
        metadata: {
            company: "Marham",
        },
        });
    
        res
        .status(200)
        .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});