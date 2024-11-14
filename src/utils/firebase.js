// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApT9UGfTIBGDAode7iJjDfu1nEpKdZDAc",
  authDomain: "movieflix-428c8.firebaseapp.com",
  projectId: "movieflix-428c8",
  storageBucket: "movieflix-428c8.firebasestorage.app",
  messagingSenderId: "104740013884",
  appId: "1:104740013884:web:8c8d4a5cf51409606f8039",
  measurementId: "G-3YECXTSHJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()