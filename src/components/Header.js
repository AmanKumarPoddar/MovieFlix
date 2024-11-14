import React from "react";
import logo from "../assets/Netflix_Logo_PMS.png";

import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const user = useSelector(store=>store.user)
  const navigate = useNavigate()
  const handleSignOut = ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")
    }).catch((error) => {
      // An error happened.
      navigate("/error")
    });
  }
  return (
    <div className="w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={logo} alt="Logo" />
     {user && <div className="flex p-2 justify-center items-center">
        <img className="w-10 h-10" alt="usericon" src={user?.photoURL}>
        </img >
        <button onClick={handleSignOut} className="font-bold text-white">(Sign Out)</button>
      </div>
}
      

    </div>
    
  );
};

export default Header;
