import React,{useState,useEffect} from 'react'
import { Table } from 'flowbite-react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../axios'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import { Modal,Button } from 'flowbite-react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useAxios } from '../../useAxios';
const Dashusers = () => {
  const {currentUser}=useSelector((state)=>state.user)
  const [showmore,setShowmore]=useState(true)
  const [users,setUsers]=useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);
  useAxios();
  useEffect(()=>{
    const fetchdata=async()=>{
      const res=await axios.get('/user/getusers',{withCredentials:true})
      if(res.status===200){
    const data=await res.data
    console.log(data.users)
    if(data.users.length <9){
      setShowmore(false)
    }
    setUsers(data.users)}}
    if(currentUser.isAdmin){
fetchdata();}
  }
  ,[])
  const handleDeleteuser=async()=>{
setShowModal(false);
    try{
      const res=await axios.delete(`/user/delete/${userId}`,{withCredentials:true})
    const data=await res.data;
      if(res.status===200){
       setUsers((prev)=>prev.filter((user)=>user._id != userId));
      }
      else{
        console.log(data)
      }
    }catch(error){
      console.log(error.message)
    }
  }

  const handleShowMore = async () => {
    const startIndex = userPost.length;
    try {
      const res = await axios.get(
        `/posts/gettheposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.data;
      if (res.status===200) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.posts.length < 9) {
          setShowmore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx:auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 
    dark:scrollbar-thumb-slate-300'> 
    {currentUser.isAdmin && users.length>0 ? (
     <>
   <Table>
    <Table.Head>
    <Table.HeadCell>Date Created</Table.HeadCell>
    <Table.HeadCell>User Profile</Table.HeadCell>
    <Table.HeadCell>USername</Table.HeadCell>
    <Table.HeadCell>Admin</Table.HeadCell>
    <Table.HeadCell>Delete</Table.HeadCell>
   
    </Table.Head>
    {users.map((data,index)=>(  
      <Table.Body key={index} className='divide-y'>
      <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
        <Table.Cell>{new Date(data.createdAt).toLocaleDateString()}</Table.Cell>
      <Table.Cell ><img  src={data.profilepicture} className='w-23 h-10 object-cover ml-4'/></Table.Cell>
      <Table.Cell className='font-semibold text-gray-500 dark:text-white'>{data.username}</Table.Cell>
<Table.Cell>
    {data.isAdmin ?(
        <FaCheck className='text-green-500' />
    ):(
        <FaTimes className='text-red-500'/>
    )}
</Table.Cell>
      <Table.Cell>
        <span onClick={()=>{
          setShowModal(true);
          setUserId(data._id)
        }} className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
      </Table.Cell>
      {/* <Table.Cell>
        <Link to={`/update-post/${data._id}`} >
        <span className='font-medium text-teal-500 hover:underline cursor-pointer'>Edit</span>
        </Link>
      </Table.Cell>
       */}
      </Table.Row>
  
    </Table.Body>
    ))}




   </Table>
   {showmore && (
    <button onClick={()=>{handleShowMore()}} className='w-full text-teal-500 text-sm pyy-7 self-center '>Show more</button>
   )}
   </>

    ):(
      <p>You have no users yet!</p>
    )}
    <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
<Modal.Header />
<Modal.Body>
    <div className="text-center">
<HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
<h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
Are you sure you want to delete the post?
</h3>
<div className="flex justify-center gap-4">
    <Button color='failure' onClick={()=>{handleDeleteuser()}}>
        Yes, I'm sure
    </Button>
    <Button color="gray" onClick={()=>{setShowModal(false)}}>Cancel</Button>
</div>
    </div>
</Modal.Body>
        </Modal>
    
    </div>
  )
}
export default Dashusers
