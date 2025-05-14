const express=require('express');
const Post=require('../Models/post.model')
const imagekit=require('../Models/Imagekit')
const multer =require('multer');
const verifytoken = require('../verifytoken');
const router=express.Router();
const storage=multer.memoryStorage();
const upload=multer({storage:storage});

    router.post('/createapost',verifytoken,upload.single('postimage'),async(req,res,next)=>{
        if(!req.user.isAdmin){
            return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const file = req.file;
        var url=undefined;
        var fileid=undefined;

        if(file!=null){
        const fileBuffer = file.buffer;
  
    const fileName = req.body.fileName;

const fileupload= await new Promise((resolve,reject)=>{
    imagekit.upload({
    file:fileBuffer,
    fileName:fileName,
    folder:'/blog_post_image'
},
 (error, result) => {
    console.log(result)
    if (error) reject(error);
    else resolve({url:result.url,
        fileId:result.fileId
    });
});})
url=fileupload.url;
fileid=fileupload.fileId;
console.log(url)
}
const {title,category,postimage,content}=req.body;
if(category==undefined){
    category=undefined
}    
const slug=req.body.title.split(" ").join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,"-");
        const post=new Post({
         userId:req.user.id,
         title:title,
         content:content,
         category:category,
         postimage:url,
         imagefieldid:fileid,
            slug:slug
        })
        await post.save()
        res.status(200).json({messages:"savedpost"});
    }catch(error){console.log(error.message)

        return res.status(500).json({messages:error.message})
    }
})
router.get('/gettheposts',async(req,res)=>{
    try{
        const startindex=parseInt(req.query.startindex)||0;
        const limit=parseInt(req.query.limit)||10;
        const sortdirection=req.query.order === 'asc' ?1:-1;
        console.log(req.query.postId)
        const posts=await Post.find({
            ...(req.query.userId && {userId:req.query.userId}),
            ...(req.query.category && {category:req.query.category}),
            ...(req.query.slug && {slug:req.query.slug}),
            ...(req.query.postId && {_id:req.query.postId}),
            ...(req.query.searchItem && {
                $or:[
                    {title:{$regex:req.query.searchItem,$options:'i'}},
                    {content:{$regex:req.query.searchItem,$options:'i'}}
                ]
            })
            

        }).sort({updatedAt:sortdirection})
        .skip(startindex)
        .limit(limit)
      console.log(posts);
const totalPosts=await Post.countDocuments();
const now=new Date();
const oneMonthAgo=new Date(
    now.getFullYear(),
    now.getMonth()-1,
    now.getDate()
)
console.log("hi")
const lastMonthPosts= await Post.countDocuments({
    updatedAt:{$gte:oneMonthAgo}
})

    return res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts
        })
    }
    catch(error){
        console.log("ssss")
console.log(error.messages)
return res.status(500).json({message:error.messages})
    }
})
router.delete('/deletethepost',verifytoken,async(req,res)=>{
    try{
      //  console.log(req.query.userId,req.user._id);
    if(req.query.userId != req.user.id || !req.user.isAdmin){
            return res.status(403).json({message:"Forbidden access"})
        }
    const post=await Post.deleteOne({_id:req.query.postId})
    return res.status(200).json({message:'deletion successfully'})
    }
    catch(error){
      return res.status(500).json({'message':error.message})
    }
})
// const conditionmulter=(req,res,next)=>{
//     console.log(req.body);
//     if(req.body.imageupload== true){
//         console.log('imageupload start')
//         upload.single('postimage')(req,res,next);
//     }else{
//         next();
//     }
// }
router.put('/updatepost',verifytoken,upload.single('postimage'),async(req,res)=>{
    try{
     let url=undefined;
     console.log('start',req.file);
        if(req.file && req.body.imageupload){
           
            const fileBuffer = req.file.buffer;
         
            console.log("st")

            console.log(req.body);
            const fileName = req.body.fileName;
            await imagekit.deleteFile(req.body.fieldId);
        const fileupload= await new Promise((resolve,reject)=>{
            imagekit.upload({
            file:fileBuffer,
            fileName:fileName,
            folder:'/blog_post_image'
        },
         (error, result) => {
            console.log(result)
            if (error) reject(error);
            else resolve(result.url);
        });})
        url=fileupload
        console.log(url)
        }
        else{
            url=req.body.postimage;
        }
        const { postId, title, content, category } = req.body;
        console.log("----"+title,content,postId)
   const post=await Post.findByIdAndUpdate(postId,{
    $set:{
        title:title,
         content:content,
         category:category,
         postimage:url,
        }})
        await post.save()
        console.log("success");
        res.status(201).json({messages:"savedpost"});
    }catch(error){console.log(error.message)

        return res.status(500).json({messages:error.message})
    }
})

module.exports=router;