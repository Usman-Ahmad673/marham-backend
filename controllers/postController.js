const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const Post = require('../models/postModel')
const cloudinary = require('cloudinary')


    exports.createPost = catchAsyncError(async (req, res, next) => {
        try {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
            folder: "marham-post-images",
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
        const post = await Post.create(req.body);
    
        res.status(201).json({
            success: true,
            post,
        });
        } catch (error) {
        // Handle the error appropriately
        console.error(error);
        res.status(500).json({
            success: false,
            error: "An error occurred while creating the post.",
        });
        }
    });
    

//Get ALL Posts

exports.getPosts = catchAsyncError(async (req,res,next) => {
    
    const posts = await Post.find()

    const postCount = await Post.countDocuments()
    
    res.status(200).json({
        success:true,
        posts,
        postCount
    })
})


// //Get Single Posts
// exports.getSinglePost = async (req,res,next) => {
        
//         const name = req.params.id;
//         let doctor;
    
//         // Search by hospital name
//         doctor = await Post.find({ 'hospital.hospital_name': { $regex: name, $options: 'i' } });
    
//         if (!doctor || doctor.length === 0) {
//           // If no doctor found by hospital name, search by disease name
//             doctor = await Post.find({ 'disease.name': { $regex: name, $options: 'i' } });
//             }
//         if (!doctor || doctor.length === 0) {
//             if(name === 'surgeon'){
//                 // If no doctor found by hospital name, search by disease name
//                 doctor = await Post.find({ surgeon: true });
//                 }
                
//             }
    
//         if (!doctor || doctor.length === 0) {
//           // If no doctor found by hospital name, search by disease name
//             doctor = await Post.find({ 'services.name': { $regex: name, $options: 'i' } });
//             }

//         if (!doctor || doctor.length === 0) {
//           // If no doctor found by hospital name, search by disease name
//             doctor = await Post.find({ 'city': { $regex: name, $options: 'i' } });
//             }
        
//             if (!doctor || doctor.length === 0) {
//             // If no doctor found by disease name, search by symptoms name
//             doctor = await Post.find({ 'symptoms.name': { $regex: name, $options: 'i' } });
//             }
        
//             if (!doctor || doctor.length === 0) {
//             // If no doctor found by symptoms name, search by speciality
//             doctor = await Post.find({ 'speciality': { $regex: name, $options: 'i' } });
//             }

//             if (!doctor || doctor.length === 0) {
//             // If no doctor found by symptoms name, search by speciality
//             doctor = await Post.findById(req.params.id);
//             }
        
//             const count = doctor.length;
        
//             if (!doctor || doctor.length === 0) {
//             return next(new ErrorHandler(`The Post You Searched Does Not Exist in: ${req.params.id}`, 404));
//             }
        
//             res.status(200).json({
//             success: true,
//             doctor,
//             total: count,
//             });
        
    
// }


