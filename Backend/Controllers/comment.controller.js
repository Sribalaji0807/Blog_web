const express=require('express');
const router=express.Router();
const Comment=require('../Models/comment.model');

router.post('/create',async(req,res)=>{

   try {
    const {content,postId,userId}=req.body;
    if(userId!=req.user.id){
        return res.status(403).json({message:"Unauthorized access"})
    }
    const comment=new Comment({
        content:content,
        postId:postId,
        userId:userId
    })
    await comment.save();
    res.status(201).json({message:"comment added"})
   } catch (error) {
    res.status(500).json({message:"error internal server"})
   }
})

module.exports=router;