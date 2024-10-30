// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFskytdtI1_tZPl7yq9xQzeVjXlaQXYuk",
  authDomain: "hairsalon-11f3e.firebaseapp.com",
  projectId: "hairsalon-11f3e",
  storageBucket: "hairsalon-11f3e.appspot.com",
  messagingSenderId: "1090704917144",
  appId: "1:1090704917144:web:d20d6d500aace155d786ed",
  measurementId: "G-R0ZG2S9FE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export {storage, googleProvider};