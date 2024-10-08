// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvFT6ZoeIzgDvbo47Xxfxfn2uYa7Zhds8",
  authDomain: "hair-salon-1.firebaseapp.com",
  projectId: "hair-salon-1",
  storageBucket: "hair-salon-1.appspot.com",
  messagingSenderId: "531189846238",
  appId: "1:531189846238:web:8db84b0fc9fa6a07fd324f",
  measurementId: "G-XZ3JMFN66B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

export {storage, googleProvider};