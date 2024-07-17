import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Label,TextInput,Button,Alert,Spinner} from 'flowbite-react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { signInFailure,signInStart,signInSuccess } from '../../Redux/userSlice'
const Login = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
const [formdata,setFormdata]=useState({});
const {loading,error}=useSelector(state=>state.user);
const handlesubmit=async(e)=>{
  e.preventDefault();
  if( !formdata.email || !formdata.password){
    return dispatch(signInFailure("please fill all the fields"))
  }
  else{
 try{
  dispatch(signInStart())
    const response= await fetch('http://localhost:5000/auth/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formdata)
    })
    const data= await response.json();
    console.log(data);
    if(data){
        dispatch(signInSuccess(data))
        navigate('/')
    }
else{
    
    dispatch(signInFailure(data.message))
 }}
 catch(error){
  dispatch(signInFailure(error.message))
 }}
}
const handlechange=async(e)=>{
  setFormdata({...formdata,[e.target.id]:e.target.value.trim()})
}
  return (
    <>
    <div className='min-h-screen mt-20'>
        <div className='flex p-5  max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
      {/* {left} */}
       <div className='flex-1'>
       <Link to="/" className=' font-bold text-3xl'>
        <span className="px-2 py-1  dark:text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">Curious J</span>
        blog
        </Link>
        <p className='mt-5 text-sm'>this is a demo project sigin page</p>
       </div>
       {/* {right} */}
       <div className='flex-1'>
        <form className='flex flex-col gap-4' onSubmit={(event)=>{handlesubmit(event)}} >
            <div className=''>
                
                <Label  value='Email' />  
                <TextInput type='email' id='email' placeholder='email' onChange={(event)=>{handlechange(event)}}/>
              </div>
              <div className=''>
                
                <Label  value='Password' />  
                <TextInput type='password' id='password' placeholder='password' onChange={(event)=>{handlechange(event)}} />
              </div>
              <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                {loading ? (
                 <>
                  <Spinner size='sm'/> 
                  <span>Loading...</span>
                 </>
              ):(
                  'Login'
                )}
              </Button>
        </form>
        <div className='flex gap-2 text-sm mt-5'>
            <span>Dont Have an account?</span>
            <Link to='/signin' className='text-blue-500' >
            Sign Up</Link>

        </div>
        {error && (
          <Alert className='mt-5' color='failure'>
            {error}
          </Alert>  
        )}
       </div>
        </div>
            </div>
    </>
  )
}

export default Login