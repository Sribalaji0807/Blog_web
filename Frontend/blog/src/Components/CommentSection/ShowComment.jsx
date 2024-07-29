import React, { useEffect,useState} from 'react'
import moment from 'moment'
import {FaThumbsUp} from 'react-icons/fa'
import { useSelector } from 'react-redux';
export default function ShowComment({comment,onLike}) {
    const{currentUser}=useSelector((state)=>state.user)
    const [user,setUser]=useState({});
 useEffect(()=>{
     const getuser=async()=>{
        try {
const response=await fetch(`http://localhost:5000/user/commentuser/${comment.userId}`,{credentials:"include"})
const data=await response.json();
console.log(data);
if(response.ok){
    setUser(data);
}
} catch (error) {
    console.log(error.message);
    }
    
}
getuser()
 },[comment])

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

        <p className='text-gray-400 mb-2'>{comment.content}</p>
       <div className='flex items-center gap-2 pt-2 text-xs border-t dark:border-gray-700 max-w-fit'>
        <button className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`} onClick={()=>{onLike(comment._id)}}>
            <FaThumbsUp className='text-sm'/>
        </button>
        <p className='text-gray-400'>{comment.numberOfLikes>0 && comment.numberOfLikes+" "+(comment.numberOfLikes===1?"like":"likes")}</p>
       </div>
        </div>
    </div>
  )
}
