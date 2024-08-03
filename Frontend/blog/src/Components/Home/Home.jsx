import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import PostCard from '../Post/PostCard'
import CallToAction from '../Post/CallToAction'
const Home = () => {
  const [posts,setPosts]=useState([]);
  useEffect(()=>{
    const fetchdata=async()=>{
      const response=await fetch(`http://localhost:5000/posts/gettheposts?limit=9`,{credentials:"include"});
      const data=await response.json();
      if(response.ok){
        setPosts(data.posts);
      }
    }
    fetchdata();
  },[])
  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
        <p
        className='text-gray-500 text-xs sm:text-sm'
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus error corrupti eaque sit numquam tempore aliquam iusto quas odio? Vitae magni fuga delectus, corrupti cupiditate voluptas ea exercitationem aliquid similique iure ipsa. Assumenda expedita molestias neque perferendis, sint, adipisci quisquam odio itaque alias harum earum omnis aut cupiditate sit sapiente.</p>
      {/* <Link className='text-xs sm:text-sm text-teal-500 hover:underline font-bold'>
      View all posts</Link> */}
      </div>
      <div className='p-3 bg-amber-200 dark:bg-slate-700'>
        <CallToAction />
      </div>
      <div className='max-w-6xl mx-auto flex flex-col gap-8 py-7'>
        {posts && posts.length>0 && (
          <div>
            <h2 className='text-center py-2 text-2xl font-semibold'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((data)=>(
                <PostCard key={posts._id} post={data} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home