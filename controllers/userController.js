const bcrypt = require('bcryptjs')
const sendToken = require('../utils/jwtToken')
const catchAsyncError = require('../middleware/catchAsyncError')
const ErrorHandler = require('../utils/errorHandler')
// const _ = require('lodash')
// const axios = require('axios')
// const otpGenerator = require('otp-generator')
// const twilio = require('twilio')


const User = require('../models/userModel')
const userOrderModel = require('../models/userOrderModel')
// const Otp = require('../models/otpModel')



// Initialize Twilio client
// const accountSid = 'AC9f9bff5403bd0679105533ed387dde2d'
// const authToken = '4635c3dbddfc4a6dfa93abc50df71c7b'
// const twilioClient = twilio(accountSid, authToken)




//Register a User
exports.registerUser = catchAsyncError( async(req,res,next) => {
    try {
    console.log(req.body);
    const {email,password} = req.body
    const user = await User.create({
        email,password,
    })

    console.log(user);

    res.status(201).json({
        success: true,
        user,
    })

    } catch (error) {
        // Handle the error appropriately
        console.error(error);
        res.status(500).json({
            success: false,
            error: "An error occurred while creating the User.",
        });
    }
})


//Login User
exports.loginUser = catchAsyncError( async(req,res,next) => {
    
    // const {email,password} = req.body
    const vemail = req.body.email
        const vpassword = req.body.password
    //if User has Given Email and Password
    if(!vemail || !vpassword){
        return next(new ErrorHandler("Please Enter Email & Password" , 400))
    }
    const user = await User.findOne({ email: vemail })
    
    if(!user){
        return next(new ErrorHandler("Invalid Email & Password" , 401))
    }
    const isPasswordMatched = await bcrypt.compare(vpassword , user.password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email & Password" , 401))
    }
    
    // const token = user.getJWTToken()
    // console.log(user.name);
    // console.log(isPasswordMatched);
    // console.log(user.password);
    // res.status(200).json({
    //     success: true,
        // user,
        // token
    //     vemail,
    //     vpassword
    // })
    sendToken(user,200,res)
})


//Logout User
exports.logoutUser = catchAsyncError( async(req,res,next) => {
    
    res.cookie('token', null , {
            expires: new Date(Date.now()),
            httpOnly: true
    })
    console.log('logged out');
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})



//GetUser Details
exports.getUserDetails = catchAsyncError(async (req,res,next) =>{
    console.log('getting Details of User');
    const user = await User.findById(req.query.id)
    const userOrder = await userOrderModel.find({id:req.query.id});

    console.log('User details : ' , user);
    console.log('User Order details : ' , userOrder);

    res.status(200).json({
        success: true,
        user,
        userOrder
    })


})


    exports.updateUserOrders = catchAsyncError(async (req, res, next) => {
        console.log('getting Order Details of User');
        console.log(req.body);
        
        const user = await userOrderModel.create(req.body);
    
        console.log('User details:', user);
    
        res.status(200).json({
        success: true,
        user,
        });
    });








    // exports.signUp = async (req, res) => {
    //     const user = await User.findOne({
    //     email: req.body.email,
    //     password: req.body.password,
    //     })
    
    //     if (user) return res.status(400).send("User Already Registered")
    
    //     const OTP = otpGenerator.generate(6, {
    //     digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
    //     })
    
    //     const number = req.body.number
    
    //     console.log(number);
    
    //     console.log(OTP);
    
    //     const otp = new Otp({ number: number, otp: OTP })
    //     const salt = await bcrypt.genSalt(10)
    //     otp.otp = await bcrypt.hash(otp.otp, salt)
    
    //     const result = await otp.save()
    
    //     // Send SMS with Twilio
    //     twilioClient.messages.create({
    //     body: `Your OTP is ${OTP}`,
    //     from: 'YOUR_TWILIO_PHONE_NUMBER',
    //     to: number
    //     })
    //     .then(() => {
    //         return res.status(200).send("Otp Send Successfully")
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //         return res.status(500).send("Failed to send OTP")
    //     })
    // }



// exports.verifyOtp = async ( req , res ) => {
//     const otpHolder = await Otp.find({
//         number: req.body.number
//     })

//     // console.log(otpHolder);
//     // console.log(otpHolder.name);
//     // console.log(otpHolder.otp);
    
//     if(otpHolder.length === 0) return res.status(400).send("You use an Expired OTP!")
//     const rightOtp = otpHolder[otpHolder.length - 1]
//     console.log(rightOtp.otp);
//     const validUser = await bcrypt.compare(req.body.otp , rightOtp.otp)
    
//     const {name,number} = req.body

//     if(rightOtp.number === req.body.number && validUser){
//         const user = new User(_.pick(req.body,['number']))
//         const token = user.getJWTToken()
//         const result = await user.save()
//         const OTPDelete = Otp.deleteMany({
//             number: rightOtp
//         })
//         return res.status(200).send({
//             message:"User rigistered Successfully",
//             token: token,
//             data: result
//         })
//     }
//     else{
//         return res.status(400).send({message:"Incorrect OTP"})
//     }

// } 