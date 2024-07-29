const express=require('express');
const router=express.Router();
const Comment=require('../Models/comment.model');
const verifytoken=require('../verifytoken');
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
router.put('/likeComment/:commentId',verifytoken,async(req,res)=>{
   try {
    const userId=req.user.id;
    const commentId=req.params.commentId;
    const comment=await Comment.findOne({_id:commentId});
    if(!comment){
        return res.status(404).json({message:"page not found"})
    }
    const userIndex=comment.likes.indexOf(req.user.id);
    if(userIndex==-1){
        comment.likes.push(userId);
        comment.numberOfLikes+=1;
    }
    else{
        comment.numberOfLikes-=1;
        comment.likes.splice(userIndex,1)
    }
    await comment.save()
    console.log(comment);
    return res.status(200).json(comment);
   } catch (error) {
    return res.status(500).json({message:error.message})
   }

})

module.exports=router;