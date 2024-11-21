import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";

import React from "react";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  //Fetch data from the TMDB API and update the store
  const getUpcomingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?page=1",
        API_OPTIONS
      );
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      // Or handle the data as needed in your app
      dispatch(addUpcomingMovies(data.results));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
