const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const Lab = require('../models/labModel')
const cloudinary = require('cloudinary')

//ADD Lab
// exports.createLab = catchAsyncError(async (req,res,next) => {
    
//     const lab = await Lab.create(req.body)
    
//     res.status(201).json({
//         success:true,
//         lab
//     })
// })

exports.createLab = catchAsyncError( async (req,res,next) => {
    try{
        console.log('1');
        // const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
        //     folder: "marham-lab-images",
        //     width: 150,
        //     crop: "scale",
        // });
        // console.log('2');
        
        // const images = [];
        
        // console.log('3');
        // images.push({
        //     public_id: myCloud.public_id,
        //     url: myCloud.secure_url,
        // });
        
        // console.log('4');
        // req.body.images = {
        //     public_id: myCloud.public_id,
        //     url: myCloud.secure_url,
        // };
        // console.log('5');
        // console.log(req.body.images);
        
        
        console.log('6');
        const lab = await Lab.create(req.body)
        
        console.log('7');
        res.status(201).json({
            success:true,
            lab
        })
}catch (error) {
    // Handle the error appropriately
    console.error(error);
    res.status(500).json({
        success: false,
        error: "An error occurred while creating the Lab.",
    });
    }
})

//Get ALL Labs
// exports.getLab = catchAsyncError(async (req,res) => {
    
//     const labs = await Lab.find()
    
//     res.status(200).json({
    //         success:true,
    //         labs
    //     })
    // })
    
    
    exports.getLabs = catchAsyncError( async (req,res,next) => {
        try{

            const labs = await Lab.find()
            
            if(!labs){
                return next(
                    new ErrorHandler(`No Labs Exist`,404)
                    )
                }
                
                const count = labs.length
                console.log(count);
                
                res.status(200).json({
                    total: count,
                    success:true,
                    labs
                })
            }catch (error) {
                // Handle the error appropriately
                console.error(error);
                res.status(500).json({
                    success: false,
                    error: "An error occurred while getting labs.",
                });
                }
            })
            
            //Get Single Labs
exports.getSingleLab = catchAsyncError( async (req,res,next) => {
    try{

        console.log(`You searched lab via ID :  ${req.params.id}`);
        const lab = await Lab.findById(req.params.id)
        
        // console.log(lab);
    // console.log(lab.length);
    if(!lab){
        return next(
            new ErrorHandler(`Lab Doesnot Exist with ID: ${req.params.id}`,404)
            )
    }
    
    // const city = req.params.id;
    
    // console.log(`You searched lab via ${city} city`);
    
    // const lab = await Lab.findById(req.params.id);
    // const lab = await Lab.find({ 'cities.city_name': { $regex: city, $options: 'i' } });
    
    
    // const lab_branches = lab.branches.name
    // console.log(lab_branches);

    res.status(200).json({
            success:true,
            lab
        })
    }catch (error) {
        // Handle the error appropriately
        console.error(error);
        res.status(500).json({
            success: false,
            error: "An error occurred while getting single lab.",
        });
        }
        
})


//Update Single Lab
exports.updateLab = catchAsyncError( async (req,res, next) => {
    try{

        let lab = await Lab.findById(req.params.id)
        
        if(!lab){
            return next(
                new ErrorHandler(`Lab Doesnot Exist with ID: ${req.params.id}`,404)
                )
            }
            
            lab = await Lab.findByIdAndUpdate(req.params.id, req.body,
                {
                    new:true,
                    runValidators:true,
                    useFindAndModify:false
                }) 
                
                res.status(200).json({
                    success:true,
                    lab
                })
            }catch (error) {
                // Handle the error appropriately
                console.error(error);
                res.status(500).json({
                    success: false,
                    error: "An error occurred while updating lab.",
                });
                }
})

//Delete Lab
exports.deleteLab = catchAsyncError( async (req,res, next) => {
    try{

        const lab = await Lab.findByIdAndDelete(req.params.id)
        
        if(!lab){
        return next(
            new ErrorHandler(`Lab Doesnot Exist with ID: ${req.params.id}`,404)
        )
    }

    // await Lab.remove() 
    else{
        res.status(200).json({
            success:true,    
            message:"Lab Deleted Successfully"
        })
    }
}catch (error) {
    // Handle the error appropriately
    console.error(error);
    res.status(500).json({
        success: false,
        error: "An error occurred while deleting the lab.",
    });
    }
})

//Get Single Labs
exports.getlabbycity = catchAsyncError( async (req,res,next) => {
    
    // const lab = await Lab.findById(req.params.id)
    try {

    const { city } = req.query;

    console.log(city);

    let lab = await Lab.find({ 'cities.city_name': { $regex: city, $options: 'i' }  });

    if(!lab){
        return next(
            new ErrorHandler(`Lab Doesnot Exist with ID: ${req.body.city}`,404)
        )
    }

    console.log(lab);
    const count = lab.length;


    // const lab_branches = lab.branches[0].name
    // console.log(lab_branches);
    // console.log('lab_branches');
    // console.log(`${lab.cities[0].city_name}`);
    // console.log('lab_branches2');
    // lab = await Lab.find({ 'branches.name': { $regex: city, $options: 'i' }  });


            res.status(200).json({
                total : count,
                success:true,
                lab
    
        })

    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
})
