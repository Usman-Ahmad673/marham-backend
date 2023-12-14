const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const Hospital = require('../models/hospitalModel')
const { default: mongoose } = require('mongoose')




exports.createHospital = catchAsyncError( async (req,res,next) => {
    const hospital = await Hospital.create(req.body)

    res.status(201).json({
        success:true,
        hospital
    })
})



exports.getHospitals = catchAsyncError( async (req,res,next) => {
    
    const hospitals = await Hospital.find()
    const hospitalCount = await Hospital.countDocuments()
    
    res.status(200).json({
        success:true,
        hospitals,
        hospitalCount
    })
})

//Get Single Doctors
exports.getSingleHospital = catchAsyncError( async (req,res,next) => {
    try {
        
        // const doctor = await Doctor.findById(req.params.id)
        
        const name = req.params.id;
        
        console.log(name);
        
        // Search by hospital name
        let hospital = await Hospital.find({ 'hospital.hospital_name': { $regex: name, $options: 'i' } });
        
        if(hospital.length !== 0){
            const count = hospital.length;
            return res.status(200).json({
                success:true,
                hospital,
                total : count
        })
    }
    

    if (!hospital || hospital.length === 0) {
        hospital = await Hospital.find({ 'city': { $regex: name, $options: 'i' } });
        if(hospital.length !== 0){
            const count = hospital.length;
            return res.status(200).json({
                success:true,
                hospital,
                total : count
            })
        }
    }
    
    res.status(200).json({
        success:true,
        hospital: '',
        total : 0
    })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
            
            
        })
        
        
//Update Single Hospital
exports.updateHospital = catchAsyncError(async (req,res, next) => {
    
    let hospital = await Hospital.findById(req.params.id)
    
    if(!hospital){
        return next(
            new ErrorHandler(`Hospital Doesnot Exist with ID: ${req.params.id}`,404)
        )
    }

    hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body,
                                        {
                                            new:true,
                                            runValidators:true,
                                            useFindAndModify:false
                                        }) 

    res.status(200).json({
        success:true,
        hospital
    })
})

//Get Single Hospital By Id
exports.getSingleHospitalById = catchAsyncError( async (req,res,next) => {
    try {
        
            const hospital = await Hospital.findById(req.params.id);
            const count = hospital.length;
                    res.status(200).json({
                        success:true,
                        hospital,
                        total : count
                    })        
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
            
            
        })
        
        


//Delete Doctor
exports.deleteHospital = catchAsyncError(async (req,res, next) => {
    
    const hospital = await Hospital.findByIdAndDelete(req.params.id)
    
    if(!hospital){
        return next(
            new ErrorHandler(`Hospital Doesnot Exist with ID: ${req.params.id}`,404)
        )
    }

    // await Hospital.remove()
    
        res.status(200).json({
            success:true,    
            message:"Hospital Deleted Successfully"
        })
    
})

