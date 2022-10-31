const mongoose=require('mongoose')

const SlotSchema=new mongoose.Schema({
    sloatNo: {
        type: String
    },
    status: {
        type: Boolean,
        default:false
    },
    bookedId: {
        type: String
    }
})

const SlotModel=mongoose.model('slots',SlotSchema)

module.exports=SlotModel;    