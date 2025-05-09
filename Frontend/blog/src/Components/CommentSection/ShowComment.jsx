import React, { useEffect,useState} from 'react'
import moment from 'moment'
import { useAxios } from '../../useAxios';
import axios from '../../axios'
import {FaThumbsUp} from 'react-icons/fa'
import { Textarea,Button} from 'flowbite-react';
import { useSelector } from 'react-redux';
export default function ShowComment({comment,onLike,onEdit,onDelete}) {
    const{currentUser}=useSelector((state)=>state.user)
    const [isEditing,setIsEditing]=useState(false);
    const [editcontent,setEditContent]=useState(comment.content)
    const [user,setUser]=useState({});
    useAxios();
 useEffect(()=>{
     const getuser=async()=>{
        try {
const response=await axios.get(`/user/commentuser/${comment.userId}`);
const data=await response.data;
console.log(data);
if(response.status===200){
    setUser(data);
}
} catch (error) {
    console.log(error.message);
    }
    
}
getuser()
 },[comment])
 const handlesubmit=async()=>{
    try {
        console.log(comment._id)
        const response=await axios.put(`/comment/editcomment/${comment._id}`,editcontent,{
           
            headers:{
                'Content-Type':'application/json'
            },
         
           withCredentials:true
            
        })
        if(response.status===200){
            setIsEditing(false);
            onEdit(comment._id,editcontent)
        }
    } catch (error) {
        
    }
 }
const handleEdit=async()=>{
    try {
        setIsEditing(true);
        setEditContent(comment.content)
    } catch (error) {
        
    }
}
    return (
    <div className='flex gap-2 p-4 border-b dark:border-gray-600 text-sm'>
        <div className='flex-shrink-0 mr-3 '>
            <img className="w-10 h-10 rounded-full"src={user.profilepicture} alt={user.username} />
        </div>
        <div className='flex-1'>

        <div className='flex items-center mb-1'>
            <span className='font-bold mr-1 text-xs truncate '>{user ? `@${user.username}`:'anonymus user'}</span>
       <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
        </div>

        {isEditing ?(
            <>
            <Textarea

rows='3'
id='content'
maxLength='200'
onChange={(event)=>{
    setEditContent(event.target.value)
}}
value={editcontent}
/>
<div className='flex justify-end items-center gap-3 my-3'>
<Button type='button' size='sm' gradientDuoTone='purpleToBlue'
onClick={()=>handlesubmit()}>
    Save
</Button>
<Button
type='button'
gradientDuoTone='purpleToBlue'
outline
size='sm'
onClick={()=>{setIsEditing(false)}}
>
    Cancel
</Button>
</div>
            </>
        ):(
           <>
            <p className='text-gray-400 mb-2'>{comment.content}</p>
            <div className='flex items-center gap-2 pt-2 text-xs border-t dark:border-gray-700 max-w-fit'>
             <button className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`} onClick={()=>{onLike(comment._id)}}>
                 <FaThumbsUp className='text-sm'/>
             </button>
             <p className='text-gray-400'>{comment.numberOfLikes>0 && comment.numberOfLikes+" "+(comment.numberOfLikes===1?"like":"likes")}</p>
             {currentUser && (currentUser._id===comment.userId || currentUser.isAdmin)&&(
              <>
                 <button 
                 onClick={()=>{handleEdit()}}
                 className='text-gray-400 hover:text-red-500'>
                     Edit
                 </button>
                 <button 
                 onClick={()=>{onDelete(comment._id)}}
                 className='text-gray-400 hover:text-red-500'>
                     Delete
                 </button>
              </>
             )}
            </div></>
        )}
        </div>
    </div>
  )
}
