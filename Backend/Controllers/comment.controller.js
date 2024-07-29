const express=require('express');
const router=express.Router();
const Comment=require('../Models/comment.model');
const verifytoken=require('../verifytoken')
router.post('/create',verifytoken,async(req,res)=>{

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
    res.status(201).json(comment)
   } catch (error) {
    res.status(500).json({message:"error internal server"})
   }
})
router.get('/getcomments/:postId',async(req,res)=>{
    const postId= req.params.postId;
    const comments=await Comment.find({postId:postId})
    res.status(200).json(comments);
})
module.exports=router;