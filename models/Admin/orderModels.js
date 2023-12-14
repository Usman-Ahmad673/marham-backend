const mongoose = require('mongoose')



const orderSchema = new mongoose.Schema({
    buyerName:{
        type:String
    },
    buyerAddress:{
        type:String
    },
    buyerContact:{
        type:String
    },
                orderItemName: {
                    type: String , 
                    required: true
                },
                orderItemPrice: {
                    type: Number , 
                    required: true
                },
                orderItemQuantity: {
                    type: Number , 
                    required: true
                },
                orderItemImage: {
                    type: String , 
                    required: true
                },
                orderItemProduct: {
                    type: mongoose.Schema.ObjectId , 
                    ref: "Product",
                    required: true
                },
                paidAt:{
                    type: Date,
                    // required: true
                },
})




module.exports = mongoose.model("Order",orderSchema)