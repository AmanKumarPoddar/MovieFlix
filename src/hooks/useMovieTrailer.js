import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";
const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  // Fetch trailer video
  const getMovieVideos = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movieId +
          "/videos?language=en-US",
        API_OPTIONS
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const filterData = data.results.filter(
          (video) => video.type === "Trailer"
        );
        const trailer = filterData.length ? filterData[0] : data.results[0];

        dispatch(addTrailerVideo(trailer)); // Dispatch the trailer video
      } else {
        console.warn("No videos found for the given movie ID.");
        dispatch(addTrailerVideo(null)); // Dispatch null if no videos are available
      }
    } catch (error) {
      console.error("Failed to fetch movie videos:", error);
    }
  };

  useEffect(() => {
    !trailerVideo && getMovieVideos();
  }, [movieId]);
};

export default useMovieTrailer;
