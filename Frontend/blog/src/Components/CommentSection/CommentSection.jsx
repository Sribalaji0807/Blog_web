import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Textarea,Button,Alert } from 'flowbite-react'
export default function CommentSection({postId}) {
    const [comment,setComment]=useState('');
  const {currentUser}=useSelector(state =>state.user)
const [commenterror,setCommenterror]=useState(null)
  const handlesubmit=async(e)=>{
e.preventDefault();
try {
    if(comment.length>200){
        return
    }
    const response=await fetch('http://localhost:5000/comment/create',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        credentials:"include",
        body:JSON.stringify({postId,userId:currentUser._id,content:comment})
        
    })
    const data=await response.json()
    if(response.ok){
        setComment(' ');
        console.log(data);
    }
    else{
        setCommenterror(data.message)
        console.log(data);
    }
} catch (error) {
    setCommenterror(error.message)
    console.log(error.message)
}
  }
    return (
    <div>
{currentUser?(
    <div className='flex flex-row items-center gap-2 text-sm text-gray-500 my-4'>
        <p>Signed in as:</p>
<img className='h-5 w-5 rounded-full object-cover' src={currentUser.profilepicture} alt="" />
<Link to='/dashboard?tab=profile' className='text-xs text-cyan-500 hover:underline'>
@{currentUser.username}
</Link>
    </div>
):(
    <div className='text-sm my-5 flex my-4 gap-1'>
        You must Signed in to comment
        <Link to={'/signin'} className='text-blue-500 hover:underline'>
        Sign In</Link>
    </div>
)}
{currentUser && (
    <form onSubmit={(event)=>handlesubmit(event)} className='border border-teal-500 rounded-md p-4'>
        <Textarea
        placeholder='Add a comment...'
        rows='3'
        maxLength='200'
        onChange={(event)=>{
            setComment(event.target.value)
        }}
        value={comment}
        />
        <div className='flex justify-between items-center mt-7'>
            <p className='text-gray-500'>{200-comment.length} characters</p>
            <Button outline gradientDuoTone='purpleToBlue'  type='submit'>Submit</Button>
        </div>
        {commenterror &&
        
        <Alert color='failure' className='mt-5'>
            {commenterror}
        </Alert>
        }
    </form>
)}
    </div>
  )
}
