import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [isSignedIn, setIsSignedIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null)

  const handleButtonClick = () => {
    // Use a default value for `name.current` if it's null
    const emailValue = email.current ? email.current.value : "";
    const passwordValue = password.current ? password.current.value : "";
    
    const nameValue = name.current ? name.current.value : "";
    

    //Validate the form data
    let message;
    if (isSignedIn) {
      // Sign In validation: only validate email and password
      message = checkValidData(emailValue, passwordValue);
    } else {
      // Sign Up validation: validate email, password, and name
      message = checkValidData(emailValue, passwordValue, nameValue);
    }
  
    setErrorMessage(message);
    if(message) return 
    //SignIn / SignUp Logic 
    if(!isSignedIn){
      //SignUp Logic

      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user)
    updateProfile(user, {
      displayName:nameValue , photoURL: "https://avatars.githubusercontent.com/u/147264428?v=4&size=64"
    }).then(() => {
      const {uid,email,displayName,photoURL} = auth.currentUser;
      dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
      navigate("/browse")
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      setErrorMessage(error.message)
    });
    
    
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage)
    
  });
    }
    else{
      //SignIn Logic

      signInWithEmailAndPassword(auth, emailValue, passwordValue)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    navigate("/browse")
   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage)
  });
    }
  };
  const toggleSignInForm = () => {
    setIsSignedIn(!isSignedIn);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/dae1f45f-c2c5-4a62-8d58-6e1b0c6b2d8e/b3a0c5b0-403e-4562-b01f-9d8a0c399942/NP-en-20240827-TRIFECTA-perspective_WEB_3035350d-5154-4510-a5f5-82bea690bfa0_large.jpg"
          alt=""
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black bg-opacity-80 my-16 mx-auto right-0 left-0 text-white rounded-lg"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignedIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignedIn && (
          <input
            ref={name}
            type="name"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
        >
          {isSignedIn ? "Sign In" : "Sign Up"}
        </button>
        <p onClick={toggleSignInForm} className="py-4 cursor-pointer">
          {isSignedIn
            ? "New to Netflix? Sign Up Now."
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
