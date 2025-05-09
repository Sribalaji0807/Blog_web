import React from 'react'
import { Link } from 'react-router-dom'

const PostCard=({post,key1})=>{
  return (
    <>
    <div key={key1} className='group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all'>
    <Link to={`/post/${post.slug}`}>
     <img src={post.postimage} alt=""  className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20'/>
    </Link>
     <div className='flex flex-col p-3 gap-2'>
         <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
         <p className='italic text-sm'>{post.category}</p>
     </div>
     <Link to={`/post/${post.slug}`} className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500
     hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-3 rounded-md
     !rounded-tl-none m-2'>
     Read Post
     </Link>
    </div>
    </>
   )
}

export default PostCard;
