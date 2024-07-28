import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { TextInput,Select,FileInput,Button } from 'flowbite-react'
export default function UpdatePost() {
    const navigate=useNavigate()
    const [formdata,setFormdata]=useState({});
    const [filename,setFilename]=useState(null);
const {postId}=useParams();
const [imageChange,setImageChange]=useState(false);
    const [image,setImage]=useState(null)
    const [imageurl,setImageurl]=useState(null);
    useEffect(()=>{
        const getpost=async()=>{
            console.log(postId);
            const response=await fetch(`http://localhost:5000/posts/gettheposts?postId=${postId}`,{method:'GET',credentials:'include'})
            const data=await response.json();
            if(!response.ok){
                console.log("error");
            }else{
            console.log(data.posts)
            setFormdata(data.posts[0])
        }}
        getpost()
    },[postId])
    const handleinput=async(e)=>{
        setFormdata((prev)=>({...prev,[e.target.id]:e.target.value}))
    }
    const handleImage=(e)=>{
        
        const file=e.target.files[0]
        
       if(file) {setImage(file)
        setFilename(file.name)
        setImageurl(URL.createObjectURL(file))
    setImageChange(true);}
    
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
       
        const formData=new FormData();
        console.log(formdata);
        
        formData.append('title',formdata.title)
        formData.append('category',formdata.category)
        formData.append('content',formdata.content)
      console.log(postId);
        formData.append('postId',postId)
        formData.append('fieldId',formdata.imagefieldid)
        formData.append('fileName',filename);
      if(imageChange){  
        formData.append('imageupload',true)
        formData.append('postimage',image)
        
      }
    else{
        formData.append('imageupload',false)
        formData.append('postimage',formdata.postimage)
    }
        console.log(formData.entries())
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
          }
        try{
            const response= await fetch('http://localhost:5000/posts/updatepost',{
                method:'PUT',
                
                credentials:'include',
                body:formData,
            })
            const data=await response.json();
            if (response.ok) {
                console.log(data);
                setImageChange(false)
             navigate('/');
              } 
            }
        catch(error){ 
console.log(error.message)
        }
    }
  return (
<div className='p-3 max-w-3xl min-h-screen mx-auto'>
    <h1 className='text-center text-3xl my-7 font-semibold' >Create a post</h1>
<form className='flex flex-col gap-4' onSubmit={(event)=>handleSubmit(event)}>
<div className='flex flex-col gap-4 sm:flex-row justify-between'>
    <TextInput placeholder='title' type='text' required id='title' className='flex-1' value={formdata.title}  onChange={(event)=>handleinput(event)} />
<Select id='category' value={formdata.category} onChange={(event)=>handleinput(event)}>
    <option value="uncategorized">Select a Category</option>
    <option value="Javascript">Javascript</option>
    <option value="React.js">React.js</option>
    <option value="Node.js">Node.js</option>
</Select>
</div>

<div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>

<FileInput type='file' accept='image/*' onChange={(event)=>handleImage(event)} />
<Button type="button" gradientDuoTone="purpleToBlue" size='sm' outline>Upload image</Button>

</div>
<img className=" w-full h-full object-cover border-8 border-[lightgray]" src={imageurl?imageurl:formdata.postimage} alt="" />

<ReactQuill theme="snow" placeholder="Write Something .." value={formdata.content} className="h-72 mb-12" required id='content' onChange={(value)=>{
    console.log(formdata.content);
    setFormdata({...formdata,content:value})}}/>
<Button gradientDuoTone="purpleToPink" type='submit' >Publish</Button>
</form>
</div>
)
}
