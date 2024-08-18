// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-70238.firebaseapp.com",
  projectId: "mern-70238",
  storageBucket: "mern-70238.appspot.com",
  messagingSenderId: "547943649710",
  appId: "1:547943649710:web:389ae659b4636e0a57383f",
  measurementId: "G-WWR442XT9E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
