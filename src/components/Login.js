import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";

const Login = () => {

  const [isSignedIn, setIsSignedIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null)
  const handleButtonClick = () => {
    //Validate the form data
    const message = checkValidData(email.current.value, password.current.value,name.current.value);
    setErrorMessage(message);
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
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
