const express=require('express');
const verifytoken = require('../verifytoken');
const router=express.Router();
const User=require('../Models/user.model')

router.delete('/delete/:userid',async(req,res,next)=>{
    if(req.user.id!=req.params.userid){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        await User.findByIdAndDelete(req.params.userid)
        res.status(200).json({message:"Success"})
    }
    catch(error){
        return res.status(403).json({message:error.message});
    }
})
module.exports=router;

