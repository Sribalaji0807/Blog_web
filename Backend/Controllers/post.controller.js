const express=require('express');
const Post=require('../Models/post.model')
const imagekit=require('../Models/Imagekit')
const multer =require('multer')
const storage=multer.memoryStorage();
const upload=multer({storage:storage});
const router=express.Router();
router.post('/createapost',upload.single('postimage'),async(req,res,next)=>{
    if(!req.user.isAdmin){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const file = req.file;
        var url=undefined;
        if(file!=null){
        const fileBuffer = file.buffer;
    console.log(fileBuffer);
    console.log(req.body);
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
    else resolve(result.url);
});})
url=fileupload
console.log(url)
}
const {title,category,postimage,content}=req.body;
if(category==undefined){
    category=undefined
}
console.log(title,content,req.user.id)    
const slug=req.body.title.split(" ").join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,"-");
        const post=new Post({
         userId:req.user.id,
         title:title,
         content:content,
         category:category,
         postimage:url,
            slug:slug
        })
        await post.save()
        res.status(201).json({messages:"savedpost"});
    }catch(error){console.log(error.message)

        return res.status(500).json({messages:error.message})
    }
})
router.get('/gettheposts',async(req,res)=>{
    try{
        const startindex=parseInt(req.query.startindex)||0;
        const limit=parseInt(req.query.limit)||10;
        const sortdirection=req.query.order === 'asc' ?1:-1;
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
const totalPosts=await Post.countDocuments();
const now=new Date();
const oneMonthAgo=new DataTransfer(
    now.getFullYear(),
    now.getMonth()-1,
    now.getDate()
)
const lastMonthPosts= await Post.countDocuments({
    updatedAt:{$gte:oneMonthAgo}
})

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts
        })
    }
    catch(error){

    }
})

module.exports=router;