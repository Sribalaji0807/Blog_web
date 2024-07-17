const express=require('express');
const router=express.Router();
const User=require('../Models/user.model')
const jwt=require('jsonwebtoken')
router.post('/signup',async(req,res)=>{
const {username,email,password}=req.body;
if(!username||!email||!password){
    return res.status(422).json({message:"please add all the fields"});
}
const user=new User({
    username,
    email,
    password,

});
try{

    await user.save();
    if(user)
        {
            return res.status(200).json({message:"Success"})
        }
      
}
catch(error){
    return res.status(500).json({message:error.message})
}
})

router.post('/login',async(req,res)=>{

    const {email,password}=req.body;
    if(!email||!password){
        return res.status(422).json({message:"please add all the fields"});
    }
    const user=await User.findOne({email:email});
    if(!user){
        return res.status(422).json({message:"Invalid Email or Password"});
    }
    if(user.password!==password){
        return res.status(422).json({message:"Invalid Email or Password"});
    }
    const token= jwt.sign({id:user._id},process.env.JWT_SECRET)
    const {password:pass,...rest}=user._doc;
    console.log(rest);
    return res.status(200).cookie('access-token',token,{
        httpOnly:true
    }).json(rest)
})
module.exports=router;
