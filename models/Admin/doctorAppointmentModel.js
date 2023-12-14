const mongoose = require('mongoose')
const validator = require('validator')

const doctorAppointmentSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    phone:{
        type:String
    },
    ctime:{
        type:String
    },
    cdate:{
        type:String
    },
    vtime:{
        type:String
    },
    vdate:{
        type:String
    },
    doctorLocation:{
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
    }
})

module.exports = mongoose.model("Doctor Appointments",doctorAppointmentSchema)