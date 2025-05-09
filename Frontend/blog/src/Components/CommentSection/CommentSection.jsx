import React from 'react'
import axios from '../../axios'
import { useAxios } from '../../useAxios'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ShowComment from './ShowComment'
import { useNavigate } from 'react-router-dom'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import { Textarea,Button,Alert,Modal } from 'flowbite-react'
export default function CommentSection({postId}) {
    const navigate=useNavigate();
    const [comment,setComment]=useState('');
    const [comments,setComments]=useState([])
    const [showModal, setShowModal] = useState(false);
const [commenttodelete,setCommenttodelete]=useState(null);
  const {currentUser}=useSelector(state =>state.user)
const [commenterror,setCommenterror]=useState(null)
useAxios();
  useEffect(()=>{
      const fetchdata=async()=>{
        const response=await axios.get(`/comment/getcomments/${postId}`)
        console.log(response);
        const data=await response.data;
        console.log(data);
        if(response.status===200){
            setComments(data)
        }
      }
      fetchdata()
  },[postId])
  const handlesubmit=async(e)=>{
e.preventDefault();
try {
    if(comment.length>200){
        return
    }
    const response = await axios.post('/comment/create', {
        postId,
        userId: currentUser._id,
        content: comment
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true  // For sending cookies with cross-origin requests
    });
    const data=await response.data;
    console.log(data);
    if(response.status===200){
        setComment('');
        setComments([data,...comments])
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
  const handleDelete=async()=>{
try {
    if(!currentUser){
        navigate('/signin')
        return;
    }
    const response = await axios.delete(`/comment/deletecomment/${commenttodelete}`, {
        withCredentials: true  // Ensures cookies are included in the request
    });
    
    if(response.status===200){
        setShowModal(false);
        setComments(comments.filter(comment=>comment._id!=commenttodelete))
    }
} catch (error) {
    console.log(error.message)
}
  }
  const handleEdit=async(commentId,editComment)=>{
setComments(
    comments.map(comment=>comment._id===commentId?{...comment,content:editComment}:comment)
)
  }
  const handleLike=async(commentId)=>{
     try {
        console.log("start")
        if(!currentUser){
            navigate('/signin');
            return
        }
        const response=await axios.put(`/comment/likeComment/${commentId}`,{withCredentials:true})
        if(response.ok){
            const data=await response.data;
            console.log(data);
            setComments(comments.map(comment=>comment._id===commentId?{
                ...comment,
                likes:data.likes,
                numberOfLikes:data.numberOfLikes
            }:comment))
        }
     } catch (error) {
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
        id='content'
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

{comments.length===0 ?(
   <p className='text-sm my-5'>No comments yet</p>
):(
    <>
    <div className='text-sm flex items-center gap-1 mt-3'>
    <p>Comments</p>
    <div className='border border-gray-400 py-1 px-3 rounded-sm'>
        <p>{comments.length}</p>
    </div>
</div>
<div>

{comments.map((data)=>(
    <ShowComment key={data._id} comment={data} onLike={handleLike} onEdit={handleEdit} onDelete={(data)=>{
        setShowModal(true);
        setCommenttodelete(data);

    }}/>
))}
</div>
</>
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
    <Button color='failure' onClick={()=>{handleDelete()}}>
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
