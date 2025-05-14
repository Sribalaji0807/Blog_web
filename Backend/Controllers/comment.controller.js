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
    res.status(200).json(comment)
   } catch (error) {
    res.status(500).json({message:"error internal server"})
   }
})
router.get('/getallcomments/:userId',verifytoken,async(req,res)=>{
    if(req.params.userId != req.user.id){
        return res.status(403).json({message:"unauthorized access"})
    }
    const startindex=parseInt(req.query.startindex)||0;
    const limit=parseInt(req.query.limit)||10;
    const comments=await Comment.find().skip(startindex).limit(limit);
    const totalComments=await Comment.countDocuments();
    const now=new Date();
    const oneMonthAgo=new Date(
        now.getFullYear(),
        now.getMonth()-1,
        now.getDate()
    )
    const lastMonthComments=await Comment.countDocuments({
        updatedAt:{$gte:oneMonthAgo}
    })
    res.status(200).json({comments,
        totalComments,
        lastMonthComments
})
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
router.put('/editcomment/:commentId',verifytoken,async(req,res)=>{
    try {
        const commentId=req.params.commentId
        const {content}=req.body;
        console.log("start");
        const comment=await Comment.findById(commentId)
        if(!comment){
            return res.status(404).json({message:"page not found"})
        }
        if(comment.userId!=req.user.id && !req.user.isAdmin){
            return res.status(403).json({message:"Forbidden access"})
        }
        const editcomment=await Comment.findByIdAndUpdate(commentId,{
            content:content,
        },{new:true});
        console.log("end")
        return res.status(200).json(editcomment);
    } catch (error) {
        
    }
})
router.delete('/deletecomment/:commentId',verifytoken,async(req,res)=>{
    try {
        const commentId=req.params.commentId;
        const comment=await Comment.findById(commentId);
        if(!comment){
            return res.status(404).json({message:"page not found"})
        }
        if(comment.userId!=req.user.id && !req.user.isAdmin){
            return res.status(403).json({message:"Forbidden access"})
        }
        await Comment.findByIdAndDelete(commentId);
        return res.status(200).json({message:"Comment deleted"})
    } catch (error) {
        
    }
})
module.exports=router;