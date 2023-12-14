const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const otpSchema = new mongoose.Schema({
    number : {
        type: String,
        required: [true,"Please Enter Your Number"],
        unique: true,
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: {
            expires:300
        }
    }
},
    {
        timestamps: true
    }
)








module.exports = mongoose.model('OTP Verification', otpSchema)