const express =require('express');
const app=express();
const cookieparser=require('cookie-parser')
const dotenv=require('dotenv')
dotenv.config()
const User=require('./Models/user.model')
const cors=require('cors');
const multer =require('multer')
const imagekit=require('./Models/Imagekit')
const authRouter=require('./Controllers/auth.routes')
const verifytoken=require('./verifytoken')
const deleteuser=require('./Controllers/user.controller')
const posthandling=require('./Controllers/post.controller')
const port=process.env.PORT || 3000;
const storage=multer.memoryStorage();
const upload=multer({storage:storage});
const allowedOrigin = 'http://localhost:5173';
app.use(express.json());
app.use(cookieparser())
app.use(cors({
    origin: allowedOrigin,
    credentials: true,
}));app.use('/auth',authRouter)
app.use('/user',verifytoken,deleteuser);
app.use('/post',verifytoken,posthandling)
app.post('/upload',upload.single('profilepicture'),async(req,res)=>{
    const {username,email,id}=req.body;
    const file = req.file;
    if (!username || !email || !file) {
        return res.status(400).send('All fields are required.');
    }
    try{
    // Prepare file data for ImageKit upload
    const fileBuffer = file.buffer;
    console.log(fileBuffer);
    console.log(req.body);
    const fileName = req.body.fileName;
   
const fileupload= await new Promise((resolve,reject)=>{
    imagekit.upload({
    file:fileBuffer,
    fileName:fileName,
    folder:'/blog_user_profile'
},
 (error, result) => {
    console.log(result)
    if (error) reject(error);
    else resolve(result.url);
});})
const user= await User.findOneAndUpdate({
    _id:id,
},{
    $set:{profilepicture:fileupload,
        username:username,
        email:email
    }},{new:true})


const {password:pass,...rest}=user._doc;
console.log(rest);
res.status(200).json(rest);
}
catch(error){
    console.log(error)
    res.status(404).json({message:error.message})
}
})

app.listen(port,()=>{
    console.log(`server running at port ${port}`);
})