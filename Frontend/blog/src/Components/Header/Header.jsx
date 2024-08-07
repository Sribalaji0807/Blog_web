import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
import { Navbar,TextInput,Button ,Dropdown,Avatar} from 'flowbite-react'
import {AiOutlineSearch} from 'react-icons/ai'
import { signOutSuccess } from '../../Redux/userSlice'
import {FaMoon,FaSun} from 'react-icons/fa'
import { useSelector ,useDispatch} from 'react-redux'
import { toggleTheme } from '../../Redux/themeSlice'
const Header = () => {
  const navigate=useNavigate();
    const dispatch=useDispatch();
    const path=useLocation().pathname;
    const {theme}=useSelector(state=>state.theme);
    const {currentUser}=useSelector(state=>state.user)
    const signOut=async()=>{
      const response=await fetch('http://localhost:5000/user/signout',{method:'POST',credentials:"include"})
      if(response.ok){
          const data=await(response.json())
          console.log(data)
      dispatch(signOutSuccess())
      navigate('/')
      }
          }
  return (
    
    <Navbar className='border-b-2 '>
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl  font-semibold dark:text-white'>
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">Curious J</span>
        blog
        </Link>
        <form >
        <TextInput
        type='text'
        placeholder='Search...'
        rightIcon={AiOutlineSearch}
        className='hidden lg:inline'
        />
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill> 
            <AiOutlineSearch />
        </Button>
        <div className='flex gap-2 md:order-2'>
        <Button
          className='w-12 h-10  sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
    {currentUser ? (
<Dropdown arrowIcon={false}
inline
label={
    <Avatar alt='usser' img={currentUser.profilepicture} rounded/>

}
>
  <Dropdown.Header>
    <span className="block text-sm">@{currentUser.username}</span>
    <span className="block text-sm font-medium truncate">{currentUser.email}</span>
    </Dropdown.Header> 
    <Link to='/dashboard?tab=profile'>
    <Dropdown.Item>Profile</Dropdown.Item>
    </Link>
    <Dropdown.Divider />
    <Dropdown.Item onClick={signOut}> Sign out</Dropdown.Item>


</Dropdown>
    ) :(
            <Link to='/signin'>
            <Button gradientDuoTone="purpletoBlue" >
                Sign In
            </Button></Link>
    )}
        <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path === '/'} as={"div"}>
                <Link to='/'>Home</Link>
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
    
    
  )
}

export default Header