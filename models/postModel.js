const mongoose = require('mongoose')
const validator = require('validator')

const postSchema = mongoose.Schema({
    askingFor:{
        type:String,
        trim:true
    },
    location:{
        type:String,
        required:true
    },
    problemtype:{
        type:String,
        required:true
    },
    problemdescription:{
        type:String,
        required:true
    },
    images:{
            public_id:{
                type:String,
                default:'1'
            },
            url:{
                type:String,
                default:'1'
            }
    }

})

module.exports = mongoose.model("Post",postSchema)