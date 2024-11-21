import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import client from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const langKey = useSelector((store) => store.config.lang);

  const searchMovieTMDB = async (movie) => {
    const response = await fetch(
      "https://api.themoviedb.org/3/search/" +
        movie +
        "?include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const data = await response.json();
    return data.results;
  };

  const handleGptSearchClick = async () => {
    const gptQuery =
      "Act as a Movie Recommendation System and suggest some movies for the query : " +
      searchText.current.value +
      ". Only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Dhoom, Sholay, Smile, Venom, Golmaal ";
    //Make an API call to GPT API and get Movie Results
    const gptResults = await client.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults?.choices)
      throw new Error("No results for the searched query.");

    const gptMovies = gptResults?.choices[0]?.message?.content.split(", ");

    //For each movie ,search TMDB API
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    //[Promise, promise, promise, promise, promise]

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults); //It gives an array of arrays

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[60%] md:pt-[8%] flex   justify-center">
      <form
        className=" bg-black w-full md:w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="p-3 m-3 col-span-9"
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
        ></input>
        <button
          onClick={handleGptSearchClick}
          className="py-2 px-3 m-3 bg-red-700 text-white rounded-lg col-span-3"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
