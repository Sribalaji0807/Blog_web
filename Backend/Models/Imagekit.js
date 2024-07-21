
const ImageKit=require('imagekit');
var imagekit=new ImageKit({
    publicKey: process.env.Imagekit_public,
    privateKey: process.env.Imagekit_private,
    urlEndpoint: "https://ik.imagekit.io/myprojectphotos"
 
})
module.exports=imagekit
