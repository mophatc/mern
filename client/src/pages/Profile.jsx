import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef, useEffect} from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'



export default function Profile() {
  const fileRef = useRef(null)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [filePerc, setFilePerc] = useState(0)
  const [formData, setFormData] = useState({})
  const {currentUser} = useSelector(state=>state.user)
  const [file, setFile ] = useState(undefined)
  
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  }, [file])

  const handleFileUpload = (file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name; 
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on('state_changed', (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        setFilePerc(Math.round(progress));
      },
      (error)=>{
        setFileUploadError(true)
    
      },
  
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL)=>
          setFormData({...formData, avatar:downloadURL})
        );
      }
      
    );
   
  };
console.log(formData)
  return (
    <div className=' p-2 max-w-lg mx-auto '>
      <h1 className='my-7 text-center text-3xl font-semibold'>Profile</h1> 
      <form className='flex flex-col gap-2'>
        <input type="file" onChange={(e)=>setFile(e.target.files[0])} hidden accept='image/*'  ref={fileRef} />


      <img onClick={()=>{fileRef.current.click()}} src={formData.avatar || currentUser.avatar} alt="profile" className='rounded-full w-20 object-cover cursor-pointer h-20 self-center '/>
      <p className='text-sm self-center'>
        {fileUploadError ? (
      <span className='text-red-700'>Error Occured while Uploading the Image(image must be less than 3mb and it must be an image file )</span>  )

      : filePerc > 0 && filePerc<100 ? (
        <span className='text-slate-500'> Uploading {filePerc} % </span>)
        :
        filePerc===100?(
          <span className='text-green-500'>Image successfully Uploaded </span>
        )
        :(
        ''

      )}
      </p>
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
