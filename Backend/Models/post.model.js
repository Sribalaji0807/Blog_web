const mongoose=require('mongoose');

mongoose.connect(process.env.Mongodb_connection).then(()=>{
    console.log("connected to mongodb");
})

const postSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
         },
    postimage:{
        type:String,
        default:"https://imgs.search.brave.com/RxU_JWkzqt7jCn-57golyutkZCGlFRzjq7cVVzL4rHg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ0/MDI0NjY4My9waG90/by9ibG9nLXdvcmQt/b24td29vZGVuLWN1/YmUtYmxvY2tzLW9u/LWdyYXktYmFja2dy/b3VuZC53ZWJwP2I9/MSZzPTE3MDY2N2Em/dz0wJms9MjAmYz1l/UnBtMW43cXZ1a2d4/N2JLNFpXSDhfTE84/QlBBb0ZGc3hDR2JE/RmF0a29FPQ"
    },
    category:{
        type:String,
        default:"uncategorized"
    },
    slug:{
        type:String,
        required:true}
},{timestamps:true})
const post=mongoose.model('post',postSchema);
module.exports=post;