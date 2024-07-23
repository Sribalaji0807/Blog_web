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
    profilepicture:"https://imgs.search.brave.com/pO94k9yZcsDjlwLJtAyBbvvI2M4ugV_Zx7fWwVg_he8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzc2LzY5LzY3/LzM2MF9GXzU3NjY5/Njc1MV9zb2NXTXRl/aEVXcDRTeXZEbEp0/c3RJQWtCYWtrR1RW/ay5qcGc"

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
    const token= jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET)
    const {password:pass,...rest}=user._doc;
    console.log(rest);
    return res.status(200).cookie('accesstoken',token,{
        httpOnly:true
    }).json(rest)
})
module.exports=router;
