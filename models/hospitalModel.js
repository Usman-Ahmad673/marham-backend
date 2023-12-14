const mongoose = require('mongoose')

const hospitalSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    city:{
        type:String
    },
    address:{
        type:String
    },
    about:{
        type:String
    },
    specialities:[
        {
            name:{
                type: String
            }
        }
    ],
    tests:[{
        test_name:{
            type:String
        },
        test_price:{
            type:String,
            default:null
        }
    }],
    contact:{
        type:String
    },
    description:{
        type:String
    },
    helpline:{
        type:String
    }
})

module.exports = mongoose.model("Hospital",hospitalSchema)