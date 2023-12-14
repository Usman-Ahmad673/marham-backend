const mongoose = require('mongoose')
const validator = require('validator')

const doctorSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    accountNumber:{
        type:Number,
        required: true
    },
    images:
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ,
    videoConsult:{
        days:[{
            type:String,
            // enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
            default: null
        }],
        timings:{
            start:{
                type:String
            },
            end:{
                type:String
            }
        },
        status:{
            type:String,
            default:'Online'
        }
    }
    ,
    city:{
        type:String
    },
    address:{
        type:String
    },
    contact:{
        type:Number
    },
    qualification:{
        type:String
    },
    experience:{
        type:String
    },
    description:{
        type:String
    },
    fee:{
        type:String
    },
    email:{
        type:String,
        validate: [validator.isEmail , "Please Enter a valid Email"],
        unique: true,
    },
    services:{
        name:{
            type:String
        }
    },
    symptoms:[{
        name:{
            type:String
        }
    }],
    disease:[{
        name:{
            type:String
        }
    }],
    speciality:{
            type:String
    },
    onlineStatus:{
        type:Boolean,
        default:false
    },
    surgeon:{
        type:Boolean,
        default: false
    },
    clinic:{
            clinic_name:{
            type:String,
            default: null
        },
        clinic_fee:{
            type:Number,
            default: null
        },
        clinic_days:[{
            type:String,
            // enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
            default: null
        }],
        clinic_address:{
            type:String,
            default: null
        },
        clinic_timings:{
            start:{
                type:String,
                default:"00:00AM"
            },
            end:{
                type:String,
                default:"12:00PM"
            }
        }
    },
    hospital:{
        hospital_name:{
            type:String,
            trim:true,
            default: null
        },
        hospital_address:{
            type:String,
            default: null
        },
        hospital_days:[{
            type:String,
            // enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
            default: null
        }]
    }
})

module.exports = mongoose.model("Doctor",doctorSchema)