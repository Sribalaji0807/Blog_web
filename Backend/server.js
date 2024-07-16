const express =require('express');
const app=express();
const dotenv=require('dotenv')
dotenv.config()
const authRouter=require('./Controllers/auth.routes')
const port=process.env.PORT || 3000;
app.use(express.json());
app.use('/auth',authRouter)

app.listen(port,()=>{
    console.log(`server running at port ${port}`);
})