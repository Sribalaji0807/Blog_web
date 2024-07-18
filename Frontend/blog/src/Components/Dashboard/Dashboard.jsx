import { useLocation } from "react-router-dom"
import { useState,useEffect } from "react";
import Profile from "./Profile";
import DashSidebar from "./DashSidebar";
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
    <div>
        {tab === 'profile' && <Profile/>}
    </div>
     </div>
  )
}

export default Dashboard