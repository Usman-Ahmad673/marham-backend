const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const Doctor = require('../models/doctorModel')
const cloudinary = require('cloudinary');
const { default: mongoose } = require('mongoose');

//ADD Doctor
// exports.createDoctor = catchAsyncError(async (req,res,next) => {
    
//     const doctor = await Doctor.create(req.body)
    
//     res.status(201).json({
//         success:true,
//         doctor
//     })
// })

exports.createDoctor = catchAsyncError(async (req, res, next) => {
    try {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
            folder: "marham-doctor-images",
            width: 150,
            crop: "scale",
        });

        const images = [];

        images.push({
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        });

        req.body.images = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
        console.log(req.body.images);
        const doctor = await Doctor.create(req.body);

        res.status(201).json({
            success: true,
            doctor,
        });
    } catch (error) {
        // Handle the error appropriately
        console.error(error);
        res.status(500).json({
            success: false,
            error: "An error occurred while creating the doctor.",
        });
    }
});

    

//Get ALL Doctors
// exports.getDoctor = catchAsyncError(async (req,res) => {
    
//     const doctors = await Doctor.find()
    
//     res.status(200).json({
//         success:true,
//         doctors
//     })
// })

exports.getDoctors = catchAsyncError(async (req, res, next) => {
    try {
        const doctors = await Doctor.find();

        const doctorCount = await Doctor.countDocuments();

        res.status(200).json({
            success: true,
            doctors,
            doctorCount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

exports.getDoctorBySearch = catchAsyncError(async (req, res, next) => {
    try {
        const { city, name } = req.query;

        // Query your database based on the search parameters
        const doctors = await Doctor.find({
            city: { $regex: city, $options: 'i' },
            name: { $regex: name, $options: 'i' },
        });

        res.status(200).json({
            success: true,
            doctors,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Get Single Doctors
exports.getSingleDoctor = catchAsyncError(async (req, res, next) => {
    try {
        
        const name = req.params.id;
        console.log(`You seracged Doctor by ${name}`);
        let doctor;
    
        console.log(`1`);
        // Search by hospital name
        if (!doctor || doctor.length === 0) {
            doctor = await Doctor.find({ 'hospital.hospital_name': { $regex: name, $options: 'i' } });
            console.log(doctor.length);
            if(doctor.length !== 0){
                const count = doctor.length;
                return  res.status(200).json({
                    success: true,
                    doctor,
                    total: count,
                    });
            }
        }
        console.log(`2`);
        
        if (!doctor || doctor.length === 0) {
            // If no doctor found by hospital name, search by disease name
            doctor = await Doctor.find({ 'disease.name': { $regex: name, $options: 'i' } });
            if(doctor.length !== 0){
                const count = doctor.length;
                return  res.status(200).json({
                    success: true,
                    doctor,
                    total: count,
                    });
            }
        
        }
        
        console.log(`3`);
        if (!doctor || doctor.length === 0) {
            if(name === 'surgeon'){
                // If no doctor found by hospital name, search by disease name
                doctor = await Doctor.find({ surgeon: true });
                if(doctor.length !== 0){
                    const count = doctor.length;
                    return  res.status(200).json({
                        success: true,
                        doctor,
                        total: count,
                        });
                }
            }
            
        }
        
        console.log(`4`);
        if (!doctor || doctor.length === 0) {
            // If no doctor found by hospital name, search by disease name
            doctor = await Doctor.find({ 'services.name': { $regex: name, $options: 'i' } });
            if(doctor.length !== 0){
                const count = doctor.length;
                return  res.status(200).json({
                    success: true,
                    doctor,
                    total: count,
                    });
            }
        }
        console.log(`5`);
        
        if (!doctor || doctor.length === 0) {
            // If no doctor found by hospital name, search by disease name
            doctor = await Doctor.find({ 'city': { $regex: name, $options: 'i' } });
            if(doctor.length !== 0){
                const count = doctor.length;
                return  res.status(200).json({
                    success: true,
                    doctor,
                    total: count,
                    });
            }
        }
        
        console.log(`6`);
        if (!doctor || doctor.length === 0) {
            // If no doctor found by disease name, search by symptoms name
            doctor = await Doctor.find({ 'symptoms.name': { $regex: name, $options: 'i' } });
            if(doctor.length !== 0){
                const count = doctor.length;
                return  res.status(200).json({
                    success: true,
                    doctor,
                    total: count,
                    });
            }
        }
        
        console.log(`7`);
        if (!doctor || doctor.length === 0) {
            // If no doctor found by symptoms name, search by speciality
            doctor = await Doctor.find({ 'speciality': { $regex: name, $options: 'i' } });
            if(doctor.length !== 0){
                const count = doctor.length;
                return  res.status(200).json({
                    success: true,
                    doctor,
                    total: count,
                    });
            }
        
        }
        console.log(`8`);
        
            res.status(200).json({
                success: true,
                doctor : '',
                total: 0,
                });
        


        
        console.log(`9`);
    
        
        console.log(`11`);
        
        
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
//Get Single Doctor By Id
exports.getSingleDoctorById = catchAsyncError(async (req, res, next) => {
    try {
        
        const name = req.params.id;
        console.log(`You seracged Doctor by Id : ${name}`);
    
        const doctor = await Doctor.findById(req.params.id);
        const count = doctor.length
        if(count !== 'null'){

            res.status(200).json({
                success: true,
                doctor,
                total: count,
            });
        }
        else{
            res.status(200).json({
                success: true,
                doctor : '',
                total: 0,
            });
            }     
    }catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    

//Update Single Doctor
exports.updateDoctor = catchAsyncError(async (req, res, next) => {
    try {    
    let doctor = await Doctor.findById(req.params.id)
    
    if(!doctor){
        return next(
            new ErrorHandler(`Doctor Doesnot Exist with ID: ${req.params.id}`,404)
        )
    }

    doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body,
                                        {
                                            new:true,
                                            runValidators:true,
                                            useFindAndModify:false
                                        }) 

    res.status(200).json({
        success:true,
        doctor
    })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

//Delete Doctor
exports.deleteDoctor = catchAsyncError(async (req, res, next) => {
    try {   
    const doctor = await Doctor.findByIdAndDelete(req.params.id)
    
    if(!doctor){
        return next(
            new ErrorHandler(`Doctor Doesnot Exist with ID: ${req.params.id}`,404)
        )
    }

    // await Doctor.remove() 
    else{
        res.status(200).json({
            success:true,    
            message:"Doctor Deleted Successfully"
        })
    }
} catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});