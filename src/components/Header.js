import React, { useEffect } from "react";
import logo from "../assets/Netflix_Logo_PMS.png";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";
const Header = () => {
  const dispatch = useDispatch()
  const showGptSearch = useSelector(store=>store.gpt.showGptSearch)
  const user = useSelector(store=>store.user)
  const navigate = useNavigate()
  const handleSignOut = ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      
    }).catch((error) => {
      // An error happened.
      navigate("/error")
    });
  }
   
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid,email,displayName,photoURL} = user;
        dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
        navigate("/browse")
       
        
      } else {
        // User is signed out
        dispatch(removeUser())
        navigate("/")
      
      }
    });
   
    return ()=>{
      unsubscribe()
    }
    
  }, [])
  const handleGptSearchClick = ()=>{
    //Toggle GPT Search
    dispatch(toggleGptSearchView())
  }
  
  const handleLanguageChange = (e)=>{
        dispatch(changeLanguage(e.target.value))
  }

  return (
    <div className="w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={logo} alt="Logo" />
     {user && <div className="flex p-2 justify-center items-center">
        {showGptSearch&&<select className="px-4 py-2 rounded-lg ml-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map(lang=><option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
        </select>}
        <button onClick={handleGptSearchClick} className="py-2 px-4 m-2 bg-purple-800 text-white rounded-lg">{showGptSearch?"Home Page":"GPT Search"}</button> 
        <img className="w-10 h-10" alt="usericon" src={user?.photoURL}>
        </img >
        <button onClick={handleSignOut} className="font-bold text-white">(Sign Out)</button>
      </div>
     }
      

    </div>
    
  );
};

export default Header;
