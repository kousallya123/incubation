const express=require('express')
const router=express.Router()
const signUpTemplateCopy=require('../models/signupModel')
const bcrypt=require('bcrypt')
const UserModel=require('../models/signupModel')
const jwt =require('jsonwebtoken') 
const ApplicationModel = require('../models/applicationModel')
const slotModel= require('../models/slotModel')
const { json } = require('express')
const SlotModel = require('../models/slotModel')
router.post('/login',(req,res)=>{
    try {

        const {ADMIN_EMAIL,ADMIN_PWD}=process.env
        const {email,password}= req.body
        if(email===ADMIN_EMAIL){
            if(password===ADMIN_PWD){
                console.log('passwordd');
                const id='8394n43x14n384n1njk'
                const token=jwt.sign({id}, process.env.JWT_KEY,{
                   
                    expiresIn:"365d",
                })

                console.log("kjhkh");
                console.log(token);

                res.json({admin: true, token:token, auth:true})

            
        }else{
            res.json('Incorrect Password')
        }
    }else{
        res.json('Incorrect email id')
    }
        
    } catch (error) {
        
    }
})

router.get('/dashboard',(req,res)=>{
    ApplicationModel.find({ status: "pending" }).then((data)=>{
        // console.log(data);
        res.json(data)
    }).catch(()=>{
        let err='something went wrong'
        res,json({err:err})
    })
})

router.post('/reject/:id', async (req, res) => {
    try {
        ApplicationModel.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                status: "rejected"
            }
        }).then(response => {
            if (response) res.status(200).json({ update: true })
        }).catch(error => {
            res.json(error)
        })
    } catch (error) {
        console.log(error);
    }
})

router.post('/approve/:id', async (req, res) => {
    try {
        ApplicationModel.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                status: "approved"
            }
        }).then(response => {
            if (response) res.status(200).json({ update: true })
        }).catch(error => {
            res.json(error)
        })
    } catch (error) {
        console.log(error);
    }
})

router.get('/approved', async (req, res) => {
    try {
        ApplicationModel.find({ status: "approved" }).then(response => {
            console.log(response);
            res.status(200).json(response)
        }).catch(error => {
            res.json(error)
        })
    } catch (error) {
        console.log(error);
    }
})


router.get('/rejected', async (req, res) => {
    try {
    ApplicationModel.find({ status: "rejected" }).then(response => {
            console.log(response);
            res.status(200).json(response)
        }).catch(error => {
            res.json(error)
        })
    } catch (error) {
        console.log(error);
    }
})


   router.get('/progress', async (req, res) => {
    try {
        ApplicationModel.find().then(response => {
            res.status(200).json(response)
        }).catch(error => {
            res.json(error)
        })
    } catch (error) {
        console.log(error);
    }
})



router.post('/create',async(req,res)=>{
    try{
        let exists=await SlotModel.findOne({sloatNo: req.body.sloatNo})
        if(exists){
            res.status(401).json('Slot already exists')
        }
        else {
        
            const createslot = new SlotModel({
                bookedId: req.body.bookedId,
                sloatNo: req.body.sloatNo,
        
            })
             await createslot.save()
             res.status(200).json({res:createslot})
    }   
}  
    catch (error) {
        res.json(error)
        console.log(error,'create slot error');
    }
    })


    router.get('/slots',async(req,res)=>{
        try {
            SlotModel.find().then(response => {
                res.status(200).json(response)
            }).catch(error => {
                res.json(error)
            })
        } catch (error) {
            // console.log(error);
        }
    })
    
    router.get('/slotBooking', async (req, res) => {
        try {
            ApplicationModel.findOneAndUpdate({ _id: req.query.companyId }, {
                $set: {
                    status: "Booked"
                }
            }).then(response => {
                if (response) {
                   SlotModel.findOneAndUpdate({ sloatNo: req.query.slotId }, {
                        $set: {
                            "bookedId": req.query.companyId,
                            "status": true
                        }
                    }).then(response => {
                        res.status(200).json(response)
                    }).catch(error => res.json(error))
                }
            }).catch(error => res.json(error))
    
    
        } catch (error) {
            console.log(error);
        }
    })
    
    


module.exports=router