import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [formData, setFormData] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [file, setFile] = useState(undefined);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    updateUserStart();
    setUploading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));

        if (progress === 100) {
          setUploading(false);
        }
      },

      (error) => {
        setFileUploadError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method:'DELETE'
      });
      const data = res.json()
      if (data.success === false){
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))

    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  };

  const handleSignOut = async ()=>{
    try {
      dispatch(signOutStart())
      const res = await fetch ('/api/auth/signOut')
      const data = await res.json()

      if(data.success === false) {
        dispatch(signOutFailure(data.message))
        return
      }
      dispatch(signOutSuccess(data))
    } catch (error) {

      dispatch(signOutFailure(data.message))
      
    }
    
  }
  return (
    <div className=" p-2 max-w-lg mx-auto ">
      <p className="text-red-700 mt-4 text-center font-semibold">
        {error ? error : ""}
      </p>
      <p className="text-green-700 mt-4 text-center font-semibold">
        {updateSuccess
          ? `Hey  ${currentUser.username} You have updated your profile Successfully`
          : ""}
      </p>
      <h1 className="my-7 text-center text-3xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-2">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          hidden
          accept="image/*"
          ref={fileRef}
        />

        <img
          onClick={() => {
            fileRef.current.click();
          }}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full w-20 object-cover cursor-pointer h-20 self-center "
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Occured while Uploading the Image(image must be less than
              3mb and it must be an image file )
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-500"> Uploading {filePerc} % </span>
          ) : filePerc === 100 ? (
            <span className="text-green-500">Image successfully Uploaded </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="Username"
          className="mt-3 border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          disabled
          placeholder="Email"
          defaultValue={currentUser.email}
          className="mt-3 border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="mt-3 border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading || uploading}
          className="bg-slate-700 text-white rounded-full p-3 uppercase hover:opacity-95 disabled:opacity-80"
          onClick={handleUpdate}
        >
          {loading || uploading ? "Loading... " : "update "}
        </button>

        <Link to={"/createProduct"} className="hover:opacity-70 bg-green-700 text-white p-3 rounded-full text-center uppercase "> Create Product</Link>
      </form>


      <div className="flex justify-between mt-3">
        <span
          className="text-red-700 cursor-pointer"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignOut}>Sign Out</span>
      </div>
    </div>
  );
}
