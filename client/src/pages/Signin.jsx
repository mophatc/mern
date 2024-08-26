import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { SignInFailure, signInStart, signInSucess } from "../redux/user/userSlice";
import OAuth from "../Components/OAuth";


function signIn() {
  const [formData, setFormData] = useState({});
  const {error, loading} = useSelector((state)=>state.user)
  // const {loading, setLoading} = useState(false);
  // const {error, setError} = useState(null)
  const [eye, setEye] = useState(false);
  const [eyeclosed, setEyeClosed] = useState(true);
  const dispatch = useDispatch();
 

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(SignInFailure(data.message))
       
      return;
      }
     dispatch(signInSucess(data))

      navigate("/");
      
    } catch (error) {
      dispatch(SignInFailure(data.message))
    }
  };

  const handleEye = () => {
    setEye(!eye);
    setEyeClosed(!eyeclosed);
  };

  return (
    <div className="p-3  max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-3 " onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          required
        />

        <div className="  bg-white flex items-center cursor-pointer">
          <input
            type={eye ? "password" : "text"}
            placeholder="Enter Password"
            id="password"
            className=" p-3 rounded-lg w-full"
            onChange={handleChange}
            required
          />
          {eye ? (
            <FaEye className="m-3  font-semibold  " onClick={handleEye} />
          ) : (
            <FaEyeSlash className="m-3  font-semibold  " onClick={handleEye} />
          )}
        </div>

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth/>
      </form>
      <div className="mt-4 flex gap-2">
        <p>Don't have an Account ? </p>{" "}
        <Link to="/sign-up">
          <span className="capitalize text-blue-600 font-bold">sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}

export default signIn;
