const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        // required: true,
    },
    paidAt: {
        type: Date,
        default: null,
    },
});

module.exports = mongoose.model('userOrder', orderSchema);
