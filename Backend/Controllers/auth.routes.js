const express=require('express');
const router=express.Router();
const User=require('../Models/user.model')

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
module.exports=router;