// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1_n0jgQFkCv__Py7IJKWmtdB_f4WEUBE",
  authDomain: "seafarer-dormitory.firebaseapp.com",
  projectId: "seafarer-dormitory",
  storageBucket: "seafarer-dormitory.firebasestorage.app",
  messagingSenderId: "838891254405",
  appId: "1:838891254405:web:c43a0d9e9405754466efec",
  measurementId: "G-MKDHL7M82C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();