import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector(state=>state.user)
  return (
    <div className=' p-2 max-w-lg mx-auto '>
      <h1 className='my-7 text-center text-3xl font-semibold'>Profile</h1> 
      <form className='flex flex-col gap-2'>

      <img src={currentUser.avatar} alt="profile" className='rounded-full w-20 object-cover cursor-pointer h-20 self-center '/>

    <input type="text"  id="username" placeholder='Username' className='mt-3 border p-3 rounded-lg' />
    <input type="email"  id="email" placeholder='Email' className='mt-3 border p-3 rounded-lg' />
    <input type="password"  id="password" placeholder='Password' className='mt-3 border p-3 rounded-lg' />
    <button  className='bg-slate-700 text-white rounded-full p-3 uppercase hover:opacity-95 disabled:opacity-80'>Upate </button>

      </form>

      <div className='flex justify-between mt-3'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>

        <span className='text-red-700 cursor-pointer'>Sign Out</span>
        </div>
      
    </div>
  )
}
