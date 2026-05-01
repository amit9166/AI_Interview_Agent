// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-92a65.firebaseapp.com",
  projectId: "interviewiq-92a65",
  storageBucket: "interviewiq-92a65.firebasestorage.app",
  messagingSenderId: "1003579036367",
  appId: "1:1003579036367:web:ad1e552c28d841d14a9dba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app)

const provider =new GoogleAuthProvider()
export {auth,provider};