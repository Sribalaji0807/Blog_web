import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Label,TextInput,Button,Alert,Spinner} from 'flowbite-react'
import { Link } from 'react-router-dom'
import axios from '../../axios'

const Signin = () => {
  const navigate=useNavigate();
const [formdata,setFormdata]=useState({});
const [error,setError]=useState(null);
const [loading,setLoading]=useState(false);
const handlesubmit=async(e)=>{
  e.preventDefault();
  if(!formdata.username || !formdata.email || !formdata.password){
    setError("all fields are required")
  }
  else{
 try{
  setLoading(true);
  setError(null);
    const response= await axios.post('/auth/signup',formdata,{
      
      headers:{
        'Content-Type':'application/json'
      },
    
    })
    const data= await response.data;
    console.log(data);
    if(!data.ok){
      setError(data.message);
    }
    navigate('/login')
  setLoading(false);
 }
 catch(error){
  setError(error.message);
  setLoading(false);
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
                
              <Label  value='Username' />  
              <TextInput type='text' id='username' placeholder='username' onChange={(event)=>{handlechange(event)}} />
            </div>
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
                  'Sign up'
                )}
              </Button>
        </form>
        <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/login' className='text-blue-500'>
            Login</Link>

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

export default Signin