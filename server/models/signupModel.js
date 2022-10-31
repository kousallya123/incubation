const mongoose=require('mongoose')

const signUpTemplate=new mongoose.Schema({
    phone:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String, 
        required:true
    },  
    date:{
        type:Date,
        default:Date.now
    }

})

const UserModel =mongoose.model('Incubation',signUpTemplate)

module.exports=UserModel