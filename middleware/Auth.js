const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
// const dotenv = require('dotenv');

exports.isAuthenticatedUser = catchAsyncError( async(req,res,next) => {
    
    const {token}  = req.cookies
    if(!token){
        return next(new ErrorHandler("Please login to Access this Resource",401))
    }
    
    const decodedData = jwt.verify(token , process.env.JWT_SECRET_KEY)
    
    // console.log(decodedData);
    
    req.user = await User.findById(decodedData.id)
    
    // console.log(token);
    next()

})



exports.adminRoles = (...roles) => {
    return(req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next( new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource` , 403))
        }
        next()
    }
}