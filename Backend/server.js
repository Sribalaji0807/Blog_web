const express =require('express');
const app=express();
const cookieparser=require('cookie-parser')
const dotenv=require('dotenv')
dotenv.config()
const path=require('path')
const dir = path.resolve();
const User=require('./Models/user.model')
const cors=require('cors');
const multer =require('multer')
const imagekit=require('./Models/Imagekit')
const authRouter=require('./Controllers/auth.routes')
const verifytoken=require('./verifytoken')
const deleteuser=require('./Controllers/user.controller')
const posthandling=require('./Controllers/post.controller')
const commenthandler=require('./Controllers/comment.controller')
const port=process.env.PORT || 3000;
const storage=multer.memoryStorage();
const upload=multer({storage:storage});
app.use(express.json());
app.use(cookieparser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use('/auth',authRouter)
app.use('/user',deleteuser);
app.use('/posts',posthandling)
app.use('/comment',commenthandler)
app.post('/upload',upload.single('profilepicture'),async(req,res)=>{
    const {username,email,id}=req.body;
    const file = req.file;
    if (!username || !email || !file) {
        return res.status(400).send('All fields are required.');
    }
    try{
    // Prepare file data for ImageKit upload
    const fileBuffer = file.buffer;
    const fileName = req.body.fileName;
   
const fileupload= await new Promise((resolve,reject)=>{
    imagekit.upload({
    file:fileBuffer,
    fileName:fileName,
    folder:'/blog_user_profile'
},
 (error, result) => {
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

res.status(200).json(rest);
}
catch(error){
    res.status(404).json({message:error.message})
}
})
app.use(express.static(path.join(dir, '/Frontend/blog/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(dir, 'Frontend', 'blog','dist', 'index.html'));
// });

app.listen(port,()=>{
    console.log(`server running at port ${port}`);
})