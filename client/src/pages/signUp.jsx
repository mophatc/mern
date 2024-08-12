import React from 'react'
import {Link} from 'react-router-dom'

function SignUp() {
  return (
    <div className='p-3  max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign UP</h1>
      <form className='flex flex-col gap-3 '>
        <input type="text" placeholder='Username' id="username"  className='border p-3 rounded-lg'/>
        <input type="email" placeholder='Email' id="email"  className='border p-3 rounded-lg'/>
        <input type="password" placeholder='Enter Password' id="password"  className='border p-3 rounded-lg'/>
        <button  className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70'>Sign UP</button>
      </form>
      <div className='mt-4 flex gap-2'>
        <p>Have an Account ? </p> <Link to="/sign-in">
        <span className='capitalize text-blue-600 font-bold'>sign in</span></Link>
      </div>
    </div>
  )
}

export default SignUp
