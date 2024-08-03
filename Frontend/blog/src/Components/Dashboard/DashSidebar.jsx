import { Sidebar } from "flowbite-react"
import {HiUser,HiArrowSmRight,HiChartPie, HiDocument,HiAnnotation, HiDocumentText, HiOutlineUser} from 'react-icons/hi'
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import {useSelector} from 'react-redux'
const DashSidebar = () => {
    const location=useLocation();
    const {currentUser}=useSelector((state)=>state.user)
    const [tab,setTab]=useState('');
    useEffect(()=>{
        const urlparams=new URLSearchParams(location.search)
        const taburl=urlparams.get('tab');
    if(taburl){
        setTab(taburl)
 } },[location.search])

  return (
    <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
            <Sidebar.ItemGroup>
              {currentUser && currentUser.isAdmin && (
                  <Link to='/dashboard?tab=overview'>
                  <Sidebar.Item active={tab==='overwiew'} icon={HiChartPie} as={"div"}>
  Dashboard
                  </Sidebar.Item>
                  </Link>
              )}
                <Link to='/dashboard?tab=profile'>
               <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin?"Admin":"user"} labelColor='dark' as={"div"} >
                Profile
                </Sidebar.Item>
                </Link>
                {currentUser.isAdmin && (
<>
                <Link to='/dashboard?tab=posts'>
                <Sidebar.Item active={tab==='posts'} icon={HiDocumentText} as={"div"}>
Posts
                </Sidebar.Item>
                </Link>
                <Link to='/dashboard?tab=users'>
                <Sidebar.Item active={tab==='users'} icon={HiOutlineUser} as={"div"}>
Users
                </Sidebar.Item>
                </Link>
                     <Link to='/dashboard?tab=comments'>
                     <Sidebar.Item active={tab=='comments'} icon={HiAnnotation} as={"div"}>
                        Comments
                     </Sidebar.Item>
                     </Link>          
</>
                )}
                <Sidebar.Item active icon={HiArrowSmRight} className="cursor-pointer" >
               Sign Out
                </Sidebar.Item> 
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar