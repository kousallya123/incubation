const express = require('express')
const router = express.Router()
const bcyrpt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/signupModel')
const ApplicationModel=require('../models/applicationModel')


router.post('/SignUp',async(req,res)=>{
  
    try{
        let {name,phone,email,password}=req.body
        password=await bcyrpt.hash(password, 10)
        UserModel.create({ 
          name:name,
          phone:phone,
          email:email,
          password:password
        }).then((response)=>{
          console.log(response);
          res.json({user: response._id})
        }).catch((err)=>{
          if(err.message.includes('E11000')>-1){
            res.json('Email already existsfjnvkjn')
          }else{
            res.json('Invalid credentials')
          }
        })
      }catch(error){
        res.json('Something went wrong')
      }
   
})


router.post('/login',async(req,res)=>{
  try {

    const {email,password}=req.body
    const user = await UserModel.findOne({email})
    if(user) {
      if(!user.isBlocked){  
        const auth = await bcyrpt.compare(password, user.password);
        if (auth) {
          const id=user._id
          const token=jwt.sign({id}, process.env.JWT_KEY,{
            expiresIn:"365d",
          })
          console.log(token);
          res.json({user: user, token:token, auth:true})
        }else{
          res.json('Incorrect password')
        }
       }else{
        res.json('Your account is blocked due to some reasons')
       }
    }else{
      res.json('Email not registered')
    }
  }catch(error){
    console.log(error);
  }
  })


  router.post('/application/:id',async function (req,res,next){
    console.log('Application form is submitted');
    const userId=req.params.id
    console.log(userId);
    req.body.userId=userId
    let eligible=await ApplicationModel.findOne({userId:req.params.id,status:"pending"})
    if(eligible){
      console.log('401');
      res.status(401).json('Form is already exists')
    }else{
      ApplicationModel.create(req.body).then((response)=>{
        console.log(response+'responseeeeeeeee');
        console.log('responseeeeeeeeeeee');
        UserModel.findOneAndUpdate({_id:userId},{$set:{isRegisterd:true}})
        .then((data)=>{
          console.log(data+'dataaaaaaaaaaaaaaa');
          data.isRegistered=true
          res.json(data)
        })
        .catch((err)=>{
          res.json(err)
        })
      })
      
    }
    
  })


module.exports = router