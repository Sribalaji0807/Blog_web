import React from 'react'
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import CallToAction from './CallToAction';
import { Spinner,Button } from 'flowbite-react';
export default function PostPage() {
    const{postSlug}=useParams();
    const [post,setPost]=useState({});
    const [loading,setLoading]=useState(false);
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
    </main>
  )
}
