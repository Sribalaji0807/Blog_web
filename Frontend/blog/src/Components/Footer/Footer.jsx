import React from 'react'
import { Footer } from 'flowbite-react'
import {BsFacebook,BsWhatsapp,BsInstagram,BsGithub,BsTwitter} from 'react-icons/bs'
import { Link } from 'react-router-dom'
const FooterComponent = () => {
  return (
   <>
  <Footer container className='border border-t-8 border-teal-500'>
<div className='w-full max-w-7xl mx-auto'>
<div className='grid w-full justify-between sm:flex md:grid-cols-1'>
    <div>
    <Link to='/' className='self-center whitespace-nowrap text-lg sm:text-xl  font-semibold dark:text-white'>
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">Curious J</span>
        blog
        </Link>
    </div>
    <div className='grid grid-cols-2 gap-8 mt-3 sm:mt-4 sm:grid-cols-3 sm:gap-4'>
   <div>
   <Footer.Title title='About' />
<Footer.LinkGroup col>
<Footer.Link href='/'>Home</Footer.Link>
<Footer.Link>
    Curious J Blog
</Footer.Link>
</Footer.LinkGroup >
   </div>
   <div>
   <Footer.Title title='Follow us' />
<Footer.LinkGroup col>
<Footer.Link href='#'>Github</Footer.Link>
<Footer.Link>
   Discord
</Footer.Link>
</Footer.LinkGroup >
   </div>
   <div>
   <Footer.Title title='Legal' />
<Footer.LinkGroup col>
<Footer.Link href='#'>Private Policy</Footer.Link>
<Footer.Link>
  Terms & Conditions
</Footer.Link>
</Footer.LinkGroup >
   </div>
    </div>
</div>
<Footer.Divider />
<div className='sm:flex sm:items-center sm:justify-between'>
    <Footer.Copyright href='#' by='Curious J Blog' year={new Date().getFullYear()}  />
<div className='flex gap-6  mt-4 sm:justify-center'>
    <Footer.Icon href='#' icon={BsFacebook}/>
    <Footer.Icon href='#' icon={BsWhatsapp}/>
    <Footer.Icon href='#' icon={BsInstagram}/>
    <Footer.Icon href='#' icon={BsGithub}/>
    <Footer.Icon href='#' icon={BsTwitter}/>
</div>
</div>
</div>
  </Footer>
   </>
  )
}

export default FooterComponent