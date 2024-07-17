const mongoose=require('mongoose');

mongoose.connect(process.env.Mongodb_connection).then(()=>{
    console.log("connected to mongodb");
})

const userSchema= mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },  
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
       
    },
    profilepicture:{
        type:String,
        required:true
    }
},{timeStamps:true});
const User=mongoose.model('User',userSchema);
module.exports=User;