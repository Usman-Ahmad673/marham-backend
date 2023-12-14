const mongoose = require('mongoose')

const surgeonAppointmentSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    phone:{
        type:String
    },
    city:{
        type:String
    },
    doctorName:{
        type:String
    },
    doctorContact:{
        type:String
    },
    doctorAccountNumber:{
        type:String
    },
})

module.exports = mongoose.model("Surgeon Appointments",surgeonAppointmentSchema)