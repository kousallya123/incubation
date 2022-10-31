const mongoose=require('mongoose')

const ApplicationSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:[true, "Name is required"]
    },
    phone:{
        type:Number,
        required: [true, "Phone is required"],
    },
    email:{
        type:String,
        required:[true, "Email is required"],
    },
    address:{
        type:String,
        required: true,
    },
    state:{
        type:String,
        required: true,
    },
    company_name:{
        type:String,
        required: true,
    },
    status:{
        type:String,
        required:true,
        default:"pending"
    }
})

const ApplicationModel =mongoose.model('application',ApplicationSchema)

module.exports=ApplicationModel