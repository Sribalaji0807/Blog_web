import React,{useState,useEffect} from 'react'
import { TextInput,Select,Button } from 'flowbite-react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import PostCard from '../Post/PostCard'
import axios from '../../axios'
const SearchComp = () => {
    const [sidebarData,setSidebarData]=useState({
        searchTerm:'',
        sort:'desc',
category:'uncategorized'    })
const [posts,setPosts]=useState([]);
const[loading,setLoading]=useState(false);
const [showMore,setShowMore]=useState(false);
const location=useLocation();
const navigate=useNavigate();
console.log(sidebarData)
useEffect(()=>{
    const urlParams=new URLSearchParams(location.search)
    const searchTermFromUrl=urlParams.get('searchTerm')
    const sortFromUrl=urlParams.get('sort');
    const categoryFromUrl=urlParams.get('category');

    if(searchTermFromUrl || sortFromUrl || categoryFromUrl){
        setSidebarData({...sidebarData,
            searchTerm:searchTermFromUrl,
            sort:sortFromUrl,
            category:categoryFromUrl
        })
    }
    const fetchPosts=async()=>{
        setLoading(true)
        const searchQuery=urlParams.toString();
        const response=await axios.get(`/posts/gettheposts?${searchQuery}`);
        const data=await response.data
        console.log(data)
        if(response.status===200){
        setPosts(data.posts)
        setLoading(false)
        if(data.posts.length ===9){
            setShowMore(true)
        }
        else{
            setShowMore(false)
        }
    }
    else{
        setLoading(false)
    }
}
fetchPosts()
},[location.search])
const handleShowMore = async () => {
    const startIndex = posts.length;
    const urlParams=new URLSearchParams(location.search);
    urlParams.set('startIndex',startIndex);
    const searchQuery=urlParams.toString();
    try {
      const res = await fetch(
        `/posts/gettheposts?${searchQuery}`);
      const data = await res.data;
      if (res.status===200) {
        setPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
const handlechange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category });
    }
  };
  const handlesubmit=async(e)=>{
    e.preventDefault();
    const urlParams=new URLSearchParams(location.search)
    urlParams.set('searchTerm',sidebarData.searchTerm)
    urlParams.set('sort',sidebarData.sort)
    urlParams.set('category',sidebarData.category);
    const searchQuery =urlParams.toString()
    navigate(`/search?${searchQuery}`)
}

  return (
   <div  className='flex flex-col md:flex-row '>
    <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500' >
        <form action=""  className='flex flex-col gap-8' onSubmit={handlesubmit}>
            <div className='flex items-center gap-2 '>
                <label htmlFor="" className='whitespace-nowrap font-semibold'>Search Term:</label>
  <TextInput 
  id='searchItem'
  type='text'
  value={sidebarData.searchTerm}
  onChange={(event)=>handlechange(event)}
  />
            </div>
            <div className='flex items-center gap-2 '>
                <label htmlFor="" className='whitespace-nowrap font-semibold'>Sort:</label>
                <Select id='sort'  value={sidebarData.sort} 
  onChange={(event)=>{handlechange(event)
    console.log(sidebarData)
  }}>
                    <option value="desc">Latest</option>
                    <option value="asc">Oldest</option>

                </Select>
            </div>
            <div className='flex items-center gap-2 '>
                <label htmlFor="">Category:</label>
                <Select id='category' value={sidebarData.category} 
  onChange={(event)=>handlechange(event)}>
                    <option value="uncategorized">Uncategorized</option>
<option value="reactjs">React.js</option>
<option value="nextjs">next.js</option>
<option value="javascript">Javascript</option>

                </Select>
            </div>
            {/* <Button>
                Apply Filters
            </Button> */}
        </form>
    </div>
    <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>Posts Results:</h1>
    <div className='p-7 flex flex-wrap gap-4'>
    {!loading && posts.length===0 && (
        <p className='text-gray-500 text-xl'>No post found</p>
    )}
    {loading && <p className='text-xl text-gray-500'>Loading..</p>}
      {!loading && posts && posts.map((data,index)=>(
        <PostCard key1={index} post={data} />
      ))      
      } 
      {showMore && (
        <button onClick={handleShowMore} className='text-teal-500 text-lg hover:underline p-7 w-full'>Show More</button>
      )}
        </div>
    </div>

   </div>
  )
}

export default SearchComp