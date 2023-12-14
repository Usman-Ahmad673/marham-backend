const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const Symptom = require('../models/symptomsModel')
const cloudinary = require('cloudinary')




exports.createSymptom = catchAsyncError(async (req,res,next) => {
    try {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
            folder: "marham-symptom-images",
            width: 150,
            crop: "scale",
        });

        const images = []

        images.push({
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        })

        req.body.images =  {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
            }
        console.log(req.body.images);
    const symptom = await Symptom.create(req.body)

    // if(!symptoms){
    //     return next(
    //         new ErrorHandler(`Error While Creating Symptom`,404)
    //     )
    // }

    res.status(201).json({
        success:true,
        symptom
    })
    } catch (error) {
        // Handle the error appropriately
        console.error(error);
        res.status(500).json({
            success: false,
            error: "An error occurred while creating the Symptoms.",
        });
    }
})


exports.getSymptoms = catchAsyncError(async (req,res,next) => {
    try{
        const symptoms = await Symptom.find()

        if(!symptoms){
            return next(
                new ErrorHandler(`No Symptoms Exist`,404)
            )
        }

        res.status(200).json({
            success:true,
            symptoms
        })

    }catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            error: "An error occurred while getting the Symptoms.",
        });
    }
    
})

exports.getSingleSymptom = catchAsyncError(async (req,res,next) => {
    try{
        const name = req.params.id;
    
        const symptom = await Symptom.find({ 'name': { $regex: name, $options: 'i' } });
    
        if(!symptom){
            return next(
                new ErrorHandler(`No Symptoms Exist with ID : ${req.params.id}`,404)
            )
        }
        
        res.status(200).json({
            success:true,
            symptom
        })

    }catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            error: "An error occurred while getting single Symptom.",
        });
    }
})