const Product = require('../../models/Admin/productModel')
const ErrorHandler = require('../../utils/errorHandler')
const catchAsyncError = require('../../middleware/catchAsyncError')
const ApiFeatures = require('../../utils/apifeatures')
const cloudinary = require('cloudinary')

//Create Product -- Admin
exports.createProduct = catchAsyncError(async (req,res,next) => {
try {
    console.log('1');

    const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
        folder: "marham-products",
        width: 150,
        crop: "scale",
    });

    console.log('2');

    const images = [];
    
    console.log('3');

    images.push({
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
    });

    console.log('4');


    req.body.images = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
    };
    
    
    console.log('5');
    
    console.log('Images Added Successfully');

    console.log('6');

    console.log('7');
    const product = await Product.create(req.body);
    console.log('8');

    res.status(201).json({
        success: true,
        product,
    });
} catch (error) {
    // Handle the error appropriately
    console.error(error);
    res.status(500).json({
        success: false,
        error: "An error occurred while creating the Disease.",
    });
}
})




//Get All Product
exports.getAllProducts = catchAsyncError(async(req,res,next) => {
    // return next(new ErrorHandler('This is my temp error' , 500))
    const resultPerPage = 10

    const productCount = await Product.countDocuments()

    // ApiFeatures(Product.find() , req.query.keyword)
    // const apiFeatures = new ApiFeatures(Product.find() , req.query).search().filter().pagination(resultPerPage)
    // const apiFeatures = new ApiFeatures(Product.find() , req.query).search().filter()


    // let products = await apiFeatures.query
    
    
    // // const products = await apiFeatures.query;

    // let filteredProductsCount = products.length;
    
    // apiFeatures.pagination(resultPerPage);
    
    let products = await Product.find();
    
    res.status(200).json({
        message:"Successfully Get All Data",
        products,
        productCount
    })
    
})

//Get Admin Product
exports.getAdminProducts = catchAsyncError(async(req,res,next) => {
    
    const products = await Product.find();
    
    // const productCount = await Product.countDocuments()
    
    res.status(200).json({
        message:"Successfully Get All Data",
        products,
        // productCount,
    })

})




//Get Product Details
exports.getProductDetails = catchAsyncError(async(req,res,next) => {
    
    const product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler('Product NOt Found' , 404))
    }
    res.status(200).json({
        success:true,
        product,
        // productCount
    })

})



//Update Product --Admin
exports.updateProduct = catchAsyncError(async(req,res,next) => {
    // let id = req.params.id
    let product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler('Product NOt Found' , 404))
    }

    //Images Updated Here
    let images = []

    if(typeof req.body.images === "string"){
        images.push(req.body.images)
    }
    else{
        images=req.body.images
    }

    if(images !== undefined){
        //Update images in cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }
    const imagesLink = []

    for(let i = 0 ; i < images.length; i++){
        const result = await cloudinary.v2.uploader.upload(images[i],{
            folder:"products images"
        })
        imagesLink.push({
            public_id:result.public_id,
            url:result.secure_url
        })
    }
    req.body.images = imagesLink
    }

    product = await Product.findByIdAndUpdate(req.params.id , req.body,{
        new:"true",
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success: true,
        message:"Successfully Updated Product",
        product
    })

})

//Update Product --Admin
exports.updateProductStocks = catchAsyncError(async(req,res,next) => {
    
    let product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler('Product NOt Found' , 404))
    }

    console.log(req.body);
    
    product = await Product.findByIdAndUpdate(req.params.id , req.body,{
        new:"true",
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success: true,
        message:"Successfully Updated Product Stocks",
        product
    })

})



//Delete Product --Admin
exports.deleteProduct = catchAsyncError(async(req,res,next) => {
    // let id = req.params.id
    const product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler('Product NOt Found' , 404))
    }


    //Del images from cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }



    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        message:"Successfully Deleted Product",
    })

})