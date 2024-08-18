
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import {useDispatch} from 'react-redux';
import { signInSucess } from "../redux/user/userSlice";



function OAuth() {
  const dispatch = useDispatch()

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
  
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
  
      const data = await res.json();
      console.log(data)
      // dispatch(signInSucess(data));
      
  
      console.log(data);
    } catch (error) {
      console.log("Could not Sign in with google", error);
    }
  };
  
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 rounded-lg uppercase p-3 text-white hover:opacity-80"
    >
      continue with google
    </button>
  );
}

export default OAuth;
