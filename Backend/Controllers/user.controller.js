const express=require('express');
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
router.get('/getusers',async(req,res)=>{
    console.log(req.user.isAdmin);
    try{
        if(req.user.isAdmin===false){
return res.status(403).json({message:"forbidden access"})
        }
        const startindex=parseInt(req.query.startindex)||0;
        const limit=parseInt(req.query.limit)||10;
        const sortdirection=req.query.order === 'asc' ?1:-1;
        console.log("start");
        const user=await User.find({}).sort({updatedAt:sortdirection})
        .skip(startindex)
        .limit(limit)
        console.log("end");

        const result=user.filter((data)=>{
            return data.isAdmin===false
        })
        console.log(result)
        const userwithoutpass=result.map((user)=>{
            const {password,...rest}=user._doc
            return rest
        })

        const totalusers=await User.countDocuments();
        const now=new Date();
        const oneMonthAgo=new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        )
        console.log("hi")
        const lastMonthusers= await User.countDocuments({
            updatedAt:{$gte:oneMonthAgo}
        })
        
            return res.status(200).json({
                    users:userwithoutpass,
                    totalusers,
                    lastMonthusers
                })
    }
    catch(error){
        return res.status(401).json({message:error.message});
    }
})
module.exports=router;

