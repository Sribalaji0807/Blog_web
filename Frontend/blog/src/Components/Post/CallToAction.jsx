import React from 'react'
import { Button } from 'flowbite-react'
export default function CallToAction() {
  return (
  <div className='flex flex-col p-3 sm:flex-row border border-teal-500 justify-center
  items-center rounded-tl-3xl rounded-br-3xl text-center '>
    <div className='flex-1 p-3 justify-center flex flex-col '>
<h2 className='text-2xl'>Want to build projects in web? </h2>
<p className='text-gray-500 my-4'>Checkout the resources with js</p>
<Button gradientDuoTone="purpleToPink" className='rounded-tl-xl rounded-bl-none'>
    <a href="https://www.freecodecamp.org/news/how-i-built-100-projects-in-100-days/" target='_blank' rel='noopener noreferrer'> 100 projects in 100 days</a>
</Button>
    </div>
    <div className='flex-1 p-7'>
        <img src="https://imgs.search.brave.com/E9FVltzgwA2kZBDZsPpCcqJTnbEjYsBd29c-t94nyhU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnJlZWNvZGVjYW1w/Lm9yZy9uZXdzL2Nv/bnRlbnQvaW1hZ2Vz/L3NpemUvdzIwMDAv/MjAxOS8xMi9PdmVy/dmlldy0tMTAwRGF5/czEwMFByb2plY3Rz/LmpwZw" alt="" />
    </div>
  </div>

  )
}
