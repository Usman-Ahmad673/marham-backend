const Order = require('../../models/Admin/orderModels')
const Product = require('../../models/Admin/productModel')
const ErrorHandler = require('../../utils/errorHandler')
const catchAsyncError= require('../../middleware/catchAsyncError')


//Create new Order
exports.newOrder = catchAsyncError(async(req,res,next) => {
    // console.log(req.user._id);
    console.log('1');
    const {
        buyerName,
        buyerAddress,
        buyerContact,
        orderItemName,
        orderItemPrice,
        orderItemQuantity,
        orderItemImage,
        orderItemProduct,
    } = req.body
    console.log('2');
    console.log(buyerName);
    console.log('3');
    console.log(buyerAddress);
    console.log('4');
    console.log(buyerContact);
    console.log('5');
    console.log(orderItemName);
    console.log('6');
    console.log(orderItemQuantity);
    console.log('7');
    console.log(orderItemImage);
    console.log('8');
    const order = await Order.create({
        buyerName,
        buyerAddress,
        buyerContact,
        orderItemName,
        orderItemPrice,
        orderItemQuantity,
        orderItemImage,
            paidAt: Date.now(),
            orderItemProduct,
        })
        
        console.log('3');

    res.status(201).json({
        success: true,
        order
    })
})


//get Single Order / Details
exports.getSingleOrder = catchAsyncError(async(req,res,next) => {
    const order = await Order.findById(req.params.id).populate("user","name email")

    if(!order){
        return next( new ErrorHandler("Order not found with this id" , 404))
    }

    res.status(201).json({
        success: true,
        order
    })
})


//get Logged in User Orders
exports.myOrders = catchAsyncError(async(req,res,next) => {
    const orders = await Order.find({ user : req.user._id })

    res.status(201).json({
        success: true,
        orders
    })
})


//get All Orders
exports.getAllOrders = catchAsyncError(async(req,res,next) => {
    const order = await Order.find()

    let totalAmount = 0
    order.forEach((order) => {
        totalAmount += order.totalPrice
    });

    res.status(201).json({
        success: true,
        totalAmount,
        order
    })
})


//update Order Status
exports.updateOrderStatus = catchAsyncError(async(req,res,next) => {
    const order = await Order.findById(req.params.id)

    if(!order){
        return next( new ErrorHandler("Order not found with this id" , 404))
    }

    
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You Have Already Delivered This Product" , 404))
    }
    
    if(order.orderStatus === "Shipped"){
        order.orderItems.forEach(async (order) => {
            await updateStock(order.product, order.quantity)
        })
    }


    order.orderStatus = req.body.status

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now()
    }

    await order.save({ validatorBeforeSave: false })
    res.status(201).json({
        success: true,
        order
    })
})

async function updateStock(id, quantity){
    const product = await Product.findById(id)
    
    product.stock -= quantity
    
    await product.save({ validatorBeforeSave: false })
}


//Delete  Order
exports.deleteOrder = catchAsyncError(async(req,res,next) => {
    const order = await Order.findByIdAndDelete(req.params.id)
    
    
    if(!order){
        return next( new ErrorHandler("Order not found with this id" , 404))
    }

    res.status(201).json({
        success: true
    })
})
