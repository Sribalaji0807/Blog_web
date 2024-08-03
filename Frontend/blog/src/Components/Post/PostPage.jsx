import React from 'react'
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import CallToAction from './CallToAction';
import PostCard from './PostCard';
import { Spinner,Button } from 'flowbite-react';
import CommentSection from '../CommentSection/CommentSection';
export default function PostPage() {
    const{postSlug}=useParams();
    const [post,setPost]=useState({});
    const [loading,setLoading]=useState(false);
    const [recentpost,setRecentpost]=useState(null);
useEffect(()=>{
    setLoading(true);
    const fetchdata=async()=>{
        const response=await fetch(`http://localhost:5000/posts/gettheposts?slug=${postSlug}`,{credentials:"include"});
        const data=await response.json();
        if(response.ok){
            console.log(data.posts)
setPost(data.posts[0])
setLoading(false);
        }
        else{
            setLoading(false);
        }
    }
    fetchdata();
},[postSlug])
useEffect(()=>{
    const fetchdata=async()=>{
        const response=await fetch(`http://localhost:5000/posts/gettheposts?limit=3`,{credentials:"include"});
        const data=await response.json();
        if(response.ok){
          console.log(data.posts)
          setRecentpost(data.posts);
        }
    }
    fetchdata()
},[])

if(loading)return(
  <div className='min-h-screen flex justify-center items-center'>
    <Spinner size='xl'/>
  </div>
)

  return (
  <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
    <h1 className='text-center text-3xl mt-10 p-3 font-serif max-w-2xl mx-auto lg:text-4xl'>{post && post.title}</h1>
    <Link to={`/search?category=${post && post.category}`} className='mt-5 self-center'>
    <Button color='gray' pill size='xs'>
        {post  && post.category}</Button></Link>
        <img src={post && post.postimage} className='mt-10 p-3 max-h-[600px] w-full object-cover' alt="" />
    <div className='flex justify-between p-3 border-b border-slate-500
    mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        {/* <span>{post && (post.content.length /1000).toFixed(0) } mins read</span> */}
    </div>
    <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{__html: post && post.content}}></div>
    <div className='max-w-4xl w-full mx-auto'>
        <CallToAction />
    </div>
    <CommentSection postId={post._id}/>
    <div className='flex flex-col justify-center items-center'>
        <h1 className='text-center text-3xl mt-10 p-3 font-serif max-w-2xl mx-auto lg:text-4xl'>Recent Posts</h1>
        <div className='flex flex-wrap gap-4 sm:justify-center' >
          {recentpost && recentpost.map((data,index)=>(
            <PostCard key={index} post={data} />
          ))}
        </div>
    </div>
    </main>
  )
}
