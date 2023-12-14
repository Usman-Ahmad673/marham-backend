const mongoose = require('mongoose')

const labSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    opening_hours:{
        type:String
    },
    cities:[{
        city_name:{
            type:String
        },
        branches:[{
            name:{
                type:String
            },
            contact:{
                type:String
            }
        }]
    }],
    discount:{
        type:Number
    },
    // patient_data:[{
    //     patient_name:{
    //         type:String
    //     },
    //     patient_number:{
    //         type:String
    //     },
    // }],

})

module.exports = mongoose.model("Lab",labSchema)