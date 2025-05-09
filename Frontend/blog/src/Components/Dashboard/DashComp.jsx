import React, { useState,useEffect } from 'react'
import { HiOutlineUserGroup,HiArrowNarrowUp,HiAnnotation,HiDocumentText } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { Button,Table } from 'flowbite-react';
import { Link } from 'react-router-dom'
import axios from '../../axios'
import { useAxios } from '../../useAxios';
export default function DashComp() {
    const {currentUser}=useSelector((state)=>state.user);
    const [users,setUsers]=useState([])
    const [posts,setPosts]=useState([])
    const [comments,setComments]=useState([]);
    const [totalusers,setTotalUsers]=useState(0);
    const [totalposts,setTotalPosts]=useState(0);
    const [totalcomments,setTotalComments]=useState(0);
    const [lastMonthUsers,setLastMonthUsers]=useState(0);
    const [lastMonthPosts,setLastMonthPosts]=useState(0);
    const [lastMonthComments,setLastMonthComments]=useState(0);
    useAxios();

useEffect(()=>{
    const fetchPost=async()=>{
        try {
            const res=await axios.get('/posts/gettheposts?limit=5')
            if(res.status===200){
          const data=await res.data;
          console.log(data.posts)
        //   if(data.posts.length <9){
        //     setShowmore(false)
        //   }
          setPosts(data.posts)
    setLastMonthPosts(data.lastMonthPosts);
    setTotalPosts(data.totalPosts);}
            
        } catch (error) {
            console.log(error.message);
        }
    }
    
    
    const fetchUsers=async()=>{
        const res=await axios.get('/user/getusers?limit=5',{withCredentials:true})
        if(res.status===200){
      const data=await res.data;
      console.log(data.users)
      console.log(data.totalUsers)
    //   if(data.users.length <9){
    //     setShowmore(false)
    //   }
      setUsers(data.users)
setLastMonthUsers(data.lastMonthUsers);
setTotalUsers(data.totalUsers);}
    };
    const fetchComments=async()=>{
        try {
            const res=await axios.get(`/comment/getallcomments/${currentUser._id}?limit=5`,{withCredentials:true})
            if(res.status===200){
          const data=await res.data;
     //     console.log(data.users)
       
          setComments(data.comments)
    setLastMonthComments(data.lastMonthComments);
    setTotalComments(data.totalComments);}
        } catch (error) {
            console.log(error.message);
        }
    };
    if(currentUser.isAdmin){
        fetchComments();
        fetchPost();
        fetchUsers()
    }
},[currentUser])
  return (
    <div className='md:mx-auto p-3'>
        <div className='flex-wrap flex gap-4 justify-center '>

        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
            <div className='flex flex-row p-3  justify-between'>
                <div>
                <h3 className='text-gray-500 text-md '>TOTAL USERS</h3>
                <p className='text-2xl'>{totalusers}</p>
                </div>
               <HiOutlineUserGroup className='text-5xl p-3 bg-teal-500 rounded-full text-white shadow-lg' as={"div"} /> 
                </div>
                <div className='flex gap-2 p-3 items-center'>
                    <span className='text-green-500 flex items-center'><HiArrowNarrowUp /></span>
                    <span>{lastMonthUsers}</span>
                    <p className='text-sm'>Last Month  </p></div>               
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
            <div className='flex flex-row p-3  justify-between'>
                <div>
                <h3 className='text-gray-500 text-md '>TOTAL POSTS</h3>
                <p className='text-2xl'>{totalposts}</p>
                </div>
               <HiDocumentText className='text-5xl p-3 bg-lime-500 rounded-full text-white shadow-lg' as={"div"} /> 
                </div>
                <div className='flex gap-2 p-3 items-center'>
                    <span className='text-green-500 flex items-center'><HiArrowNarrowUp /></span>
                    <span>{lastMonthPosts}</span>
                    <p className='text-sm'>Last Month  </p></div>               
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
            <div className='flex flex-row p-3  justify-between'>
                <div>
                <h3 className='text-gray-500 text-md '>TOTAL COMMENTS</h3>
                <p className='text-2xl'>{totalcomments}</p>
                </div>
               <HiAnnotation className='text-5xl p-3 bg-indigo-500 rounded-full text-white shadow-lg' as={"div"} /> 
                </div>
                <div className='flex gap-2 p-3 items-center'>
                    <span className='text-green-500 flex items-center'><HiArrowNarrowUp /></span>
                    <span>{lastMonthComments}</span>
                    <p className='text-sm'>Last Month  </p></div>               
        </div>
        </div>
        <div className='flex flex-wrap gap-4 py-4 mx-auto justify-center'>
            <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                <div className='flex justify-between p-3 text-sm font-semibold'>
                    <h1 className='text-center p-2'>Recent Users</h1>
                    <Button outline gradientDuoTone="purpleToPink"><Link to='/dashboard?tab=users'>
                    See all</Link></Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>User image</Table.HeadCell>
                        <Table.HeadCell>Username</Table.HeadCell>
                    </Table.Head>
                    {users && users.map((user)=>(
                        <Table.Body key={user._id} className='divide-y'>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>
                                    <img src={user.profilepicture} alt="userprofile" className='w-10 h-10 object-cover rounded-full bg-gray-500' />
                                </Table.Cell>
                                <Table.Cell>{user.username}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))}
                </Table>
            </div>
            <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                <div className='flex justify-between p-3 text-sm font-semibold'>
                    <h1 className='text-center p-2'>Recent Comments</h1>
                    <Button outline gradientDuoTone="purpleToPink"><Link to='/dashboard?tab=comments'>
                    See all</Link></Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Comment content</Table.HeadCell>
                        <Table.HeadCell>Likes</Table.HeadCell>
                    </Table.Head>
                    {comments && comments.map((comment)=>(
                        <Table.Body key={comment._id} className='divide-y'>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className='w-96'>
                                   <p className='line-clamp-2'>{comment.content}</p>   </Table.Cell>
                                <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))}
                </Table>
            </div>
            <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                <div className='flex justify-between p-3 text-sm font-semibold'>
                    <h1 className='text-center p-2'>Recent Posts</h1>
                    <Button outline gradientDuoTone="purpleToPink"><Link to='/dashboard?tab=posts'>
                    See all</Link></Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Post image</Table.HeadCell>
                        <Table.HeadCell>Post title</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>

                    </Table.Head>
                    {posts && posts.map((post)=>(
                        <Table.Body key={post._id} className='divide-y'>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>
                                    <img src={post.postimage} alt="userprofile" className='w-10 h-10 object-cover rounded-md bg-gray-500' />
                                </Table.Cell>
                                <Table.Cell className='w-96'>{post.title}</Table.Cell>
                                <Table.Cell className='w-5'>{post.category}</Table.Cell>

                            </Table.Row>
                        </Table.Body>
                    ))}
                </Table>
            </div>
        </div>
    </div>
  )
}
