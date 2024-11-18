import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";


import React from 'react'

const useTopRatedMovies = () => {
    const dispatch = useDispatch()
  
    //Fetch data from the TMDB API and update the store
    const getTopRatedMovies = async () => {
      try {
        const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?page=1", API_OPTIONS);
        if (!response.ok) throw new Error("Failed to fetch data");
        
        const data = await response.json();
        console.log(data.results);  // Or handle the data as needed in your app
        dispatch(addTopRatedMovies(data.results))
      } catch (error) {
        console.error("Error:", error);
      }
    };
    useEffect(()=>{
                getTopRatedMovies()
    },[])
}

export default useTopRatedMovies

