import React,{useState,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from '../../axios'
import { Navbar,TextInput,Button ,Dropdown,Avatar} from 'flowbite-react'
import {AiOutlineSearch} from 'react-icons/ai'
import { signOutSuccess } from '../../Redux/userSlice'
import {FaMoon,FaSun} from 'react-icons/fa'
import { useSelector ,useDispatch} from 'react-redux'
import { toggleTheme } from '../../Redux/themeSlice'
import {useAxios} from '../../useAxios'
const Header = () => {
  const navigate=useNavigate();
    const dispatch=useDispatch();
    const path=useLocation().pathname;
    const {theme}=useSelector(state=>state.theme);
    const {currentUser}=useSelector(state=>state.user)
    const [searchTerm,setSearchTerm]=useState('');
    const {unauthorized}=useAxios();
    const signOut=async()=>{
      const response=await axios.post('/user/signout',{withCredentials:true});
      if(response.status===200){
          const data=await response.data;
          console.log(data)
      dispatch(signOutSuccess())
      navigate('/')
      }
          }
          useEffect(() => {
            const urlParams = new URLSearchParams(location.search);
            const searchTermFromUrl = urlParams.get('searchTerm');
            if (searchTermFromUrl) {
              setSearchTerm(searchTermFromUrl);
            }
          }, [location.search]);
          const handleSubmit = (e) => {
            e.preventDefault();
            const urlParams = new URLSearchParams(location.search);
            urlParams.set('searchTerm', searchTerm);
            const searchQuery = urlParams.toString();
            navigate(`/search?${searchQuery}`);
          };

  return (
    
    <Navbar className='border-b-2 '>
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl  font-semibold dark:text-white'>
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">Curious J</span>
        blog
        </Link>
        <form  onSubmit={handleSubmit}>
        <TextInput
        type='text'
        placeholder='Search...'
        rightIcon={AiOutlineSearch}
        value={searchTerm}
        onChange={(event)=>setSearchTerm(event.target.value)}
        className='inline'
        />
        </form>
     
        <div className='flex gap-4 md:order-2'>
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
            <Navbar.Link active={path==='/about'} as={"div"}>
              <Link to='/about'>About</Link>
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
    
    
  )
}

export default Header