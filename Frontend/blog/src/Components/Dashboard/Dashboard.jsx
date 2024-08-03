import { useLocation } from "react-router-dom"
import { useState,useEffect } from "react";
import Profile from "./Profile";
import DashSidebar from "./DashSidebar";
import DashPosts  from "./DashPosts";
import Dashusers from './Dashusers'
import DashComments from "./DashComments";
import DashComp from "./DashComp";
const Dashboard = () => {
    const location=useLocation();
    const [tab,setTab]=useState('');
    useEffect(()=>{
        const urlparams=new URLSearchParams(location.search)
        const taburl=urlparams.get('tab');
    if(taburl){
        setTab(taburl)
 } },[location.search])
  return (
     <div className="min-h-screen flex flex-col md:flex-row">
         <div className="md:w-56">
    <DashSidebar />
</div>
    <div className="w-full">
        {tab === 'overview' && <DashComp />}
        {tab === 'profile' && <Profile/>}
        {tab==='posts' && <DashPosts/>}
        {tab==='users' && <Dashusers/>}
        {tab==='comments' && <DashComments/>}
    </div>
     </div>
  )
}

export default Dashboard