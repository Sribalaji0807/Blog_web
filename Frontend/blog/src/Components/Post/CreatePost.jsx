import React from 'react'
import axios from '../../axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput,Select,FileInput,Button } from 'flowbite-react'
export default function CreatePost() {
    const [formdata,setFormdata]=useState({});
    const [filename,setFilename]=useState(null);
const navigate=useNavigate();
    const [image,setImage]=useState(null)
    const [imageurl,setImageurl]=useState(null);
    const handleinput=async(e)=>{
        setFormdata((prev)=>({...prev,[e.target.id]:e.target.value}))
    }
    const handleImage=(e)=>{
        
        const file=e.target.files[0]
        
       if(file) {setImage(file)
        setFilename(file.name)
        setImageurl(URL.createObjectURL(file));
    }}
    const handleSubmit=async(e)=>{
        e.preventDefault();
       
        const formData=new FormData();
        formData.append('fileName',filename);
        formData.append('title',formdata.title)
        formData.append('category',formdata.category)
        formData.append('content',formdata.content)
        formData.append('postimage',image)
        
        console.log(formData)
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
          }
        try{
            const response= await axios.post('/posts/createapost',formData,{
              
                withCredentials:true,
            })
            const data=await response.data;
            if (response.status===200) {
                
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
    <TextInput placeholder='title' type='text' required id='title' className='flex-1' onChange={(event)=>handleinput(event)} />
<Select id='category' onChange={(event)=>handleinput(event)}>
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
<img className=" w-full h-full object-cover border-8 border-[lightgray]" src={imageurl} alt="" />

<ReactQuill theme="snow" placeholder="Write Something .." className="h-72 mb-12" required id='content' onChange={(value)=>{
    console.log(formdata.content);
    setFormdata({...formdata,content:value})}}/>
<Button gradientDuoTone="purpleToPink" type='submit' >Publish</Button>
</form>
</div>
)
}
