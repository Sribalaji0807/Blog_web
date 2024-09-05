import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Table,Modal,Button } from 'flowbite-react'
export default function DashComments() {
    const {currentUser}=useSelector((state)=>state.user)
    const [comments,setComments]=useState([]);
    const [commentId,setCommentId]=useState(null)
    const [showModal, setShowModal] = useState(false);
    useEffect(()=>{
        const fetchdata=async()=>{
            const res=await fetch(`/comment/getallcomments/${currentUser._id}`,{credentials:"include"})
            if(res.ok){
                const data=await res.json()
                setComments(data.comments)
            }
        }
        fetchdata()
    },[])
    const handleDeletecomment=async()=>{
        setShowModal(false);
            try{
              const res=await fetch(`/comment/deletecomment/${commentId}`,{method:'DELETE',credentials:"include"})
            const data=await res.json()
              if(res.ok){
               setComments((prev)=>prev.filter((comment)=>comment._id != commentId));
              }
              else{
                console.log(data)
              }
            }catch(error){
              console.log(error.message)
            }
          }
  return (
    <div className='table-auto overflow-x-scroll md:mx:auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 
    dark:scrollbar-thumb-slate-300'>
{currentUser.isAdmin && comments.length>0 ? (
    <>
    <Table>
        <Table.Head>
            <Table.HeadCell>DATE UPDATED</Table.HeadCell>
            <Table.HeadCell>COMMENT CONTENT</Table.HeadCell>
            <Table.HeadCell>NUMBER OF LIKES</Table.HeadCell>
            <Table.HeadCell>POSTID</Table.HeadCell>
            <Table.HeadCell>USERID</Table.HeadCell>
            <Table.HeadCell>DELETE</Table.HeadCell>
        </Table.Head>
        {comments.map((data,index)=>(
            <Table.Body>
<Table.Row>
    <Table.Cell>{new Date(data.updatedAt).toLocaleDateString()}</Table.Cell>
    <Table.Cell>{data.content}</Table.Cell>
    <Table.Cell className='text-center'>{data.numberOfLikes}</Table.Cell>
    <Table.Cell>{data.postId}</Table.Cell>
<Table.Cell>{data.userId}</Table.Cell>
<Table.Cell>
        <span onClick={()=>{
          setShowModal(true);
          setCommentId(data._id)
        }} className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
      </Table.Cell>
</Table.Row>
            </Table.Body>
        ))}
    </Table>
    </>
):(
    <p>You have no comments yet!</p>
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
    <Button color='failure' onClick={()=>{handleDeletecomment()}}>
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
