const jwt=require('jsonwebtoken');

const verifytoken=(req,res,next)=>{
    const token=req.cookies.accesstoken;
    console.log(token)
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err) return res.status(401).json({message:"Unauthorized"})
        req.user=decoded
    next()
    })
}
module.exports=verifytoken