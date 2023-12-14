const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const Diseases = require('../models/diseaseModel')
const cloudinary = require('cloudinary')



exports.createDisease = catchAsyncError(async (req, res, next) => {
    try {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
            folder: "marham-disease-images",
            width: 150,
            crop: "scale",
        });

        const images = [];

        images.push({
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        });

        req.body.images = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };

        const disease = await Diseases.create(req.body);

        res.status(201).json({
            success: true,
            disease
        });
    } catch (error) {
        // Handle the error appropriately
        console.error(error);
        res.status(500).json({
            success: false,
            error: "An error occurred while creating the Disease.",
        });
    }
});

exports.getDiseases = catchAsyncError(async (req, res, next) => {
    try {
        const diseases = await Diseases.find();

        res.status(200).json({
            success: true,
            diseases
        });
    } catch (error) {
        // Handle the error appropriately
        console.error(error);
        res.status(500).json({
            success: false,
            error: "An error occurred while fetching Diseases.",
        });
    }
});

exports.getSingleDisease = catchAsyncError(async (req, res, next) => {
    try {
        const name = req.params.id;

        const disease = await Diseases.find({ 'name': { $regex: name, $options: 'i' } });

        res.status(200).json({
            success: true,
            disease
        });
    } catch (error) {
        // Handle the error appropriately
        console.error(error);
        res.status(500).json({
            success: false,
            error: "An error occurred while fetching the Disease.",
        });
    }
});