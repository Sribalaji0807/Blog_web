import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useState,useRef } from "react"
import { Link, useNavigate } from 'react-router-dom'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import { updateStart,updateSuccess,updateFailure,deleteusersuccess,signOutSuccess } from "../../Redux/userSlice"
import { TextInput,Button,Spinner,Alert,Modal } from "flowbite-react"
const Profile = () => {
    const navigate=useNavigate();
    const dispatch= useDispatch();
    const {loading,error,currentUser}=useSelector(state=>state.user)
    const [showModal, setShowModal] = useState(false);

    const [image,setImage]=useState(null)
    const [imageurl,setImageurl]=useState(null);
    const [formdata,setFormdata]=useState({
        "username":currentUser.username,
        "email":currentUser.email
    })
    const [filename,setFilename]=useState(null);
    const imageref=useRef();
    const handleform=(e)=>{
        setFormdata({...formdata,[e.target.id]:e.target.value})
    }
    const signOut=async()=>{
const response=await fetch('/user/signout',{method:'POST',credentials:"include"})
if(response.ok){
    const data=await(response.json())
    console.log(data)
dispatch(signOutSuccess())
navigate('/')
}
    }
    const handleImage=(e)=>{
        
        const file=e.target.files[0]
        
       if(file) {setImage(file)
        setFilename(file.name)
        setImageurl(URL.createObjectURL(file));
    }}
    const deleteuser=async(req,res)=>{
        setShowModal(false)
        try{
            const response=await fetch(`/user/delete/${currentUser._id}`,{
                method:'DELETE',
credentials:"include"
            })
            
            if(response.ok){
                dispatch(deleteusersuccess())
                navigate('/')
            }
        }catch(error){

        }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
       
        const formData=new FormData();
        formData.append('fileName',filename);
        formData.append('username',formdata.username)
        formData.append('email',formdata.email)
        formData.append('id',currentUser._id);
        formData.append('profilepicture',image)
        
        console.log(formData)
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
          }
        try{
            dispatch(updateStart())
            const response= await fetch('/upload',{
                method:'POST',
                
                body:formData
            })
            const data=await response.json();
            if (response.ok) {
                
                dispatch(updateSuccess(data))
             navigate('/');
              } else {
                dispatch(updateFailure(data.message) )
               
              }
            }
        catch(error){ 
            dispatch(updateFailure(error.message))
        }
    }
  return (
<>
<div className="max-w-lg mx-auto p-3 w-full ">
    <h1 className="my-7 text-center font-semibold text-[30px]" >Profile</h1>
    <form className="flex flex-col gap-3" onSubmit={(event)=>{handleSubmit(event)}}>
        <input type="file" className="hidden" onChange={(event)=>handleImage(event)} ref={imageref} />
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={()=>imageref.current.click()} >
        <img className="rounded-full w-full h-full object-cover border-8 border-[lightgray]" src={imageurl || currentUser.profilepicture} alt="" />
        </div>
        <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username} onChange={(event)=>handleform(event)}/>
        <TextInput type="text" id="email" placeholder="email" defaultValue={currentUser.email} onChange={(event)=>handleform(event)}/>
<Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
{loading ? (
                 <>
                  <Spinner size='sm'/> 
                  <span>Loading...</span>
                 </>
              ):(
                  'Update'
                )}
</Button>
    </form>
    {currentUser.isAdmin && (
<Link to="/create-post">

    <Button gradientDuoTone="purpleToBlue" className="w-full mt-2">
        Create a post
    </Button>
</Link>
    )}
    <div className="text-red-500 flex justify-between">
        <span  className="cursor-pointer" onClick={()=>setShowModal(true)} >Delete Account</span>
        <span className="cursor-pointer" onClick={()=>{
            console.log("start")
            signOut()}}>Sign Out</span>
    </div>
</div>
    {error && (
          <Alert className='mt-5' color='failure'>
            {error}
          </Alert>  
        )}
           
<Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
<Modal.Header />
<Modal.Body>
    <div className="text-center">
<HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
<h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
Are you sure you want to delete your account?
</h3>
<div className="flex justify-center gap-4">
    <Button color='failure' onClick={deleteuser}>
        Yes, I'm sure
    </Button>
    <Button color="gray" onClick={()=>{setShowModal(false)}}>Cancel</Button>
</div>
    </div>
</Modal.Body>
        </Modal>
    
</>
)
}

export default Profile