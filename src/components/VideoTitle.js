import React from "react";
import { IoMdPlay } from "react-icons/io";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-[30%] md:pt-[14%] px-7 md:px-14 absolute text-white bg-gradient-to-r from-black w-full aspect-video">
      <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-[17px] w-1/4">
        {overview}
      </p>
      <div className="flex">
        <button className="bg-white text-black p-2 md:p-4 px-6 md:px-10 text-lg rounded-lg flex items-center hover:bg-opacity-80 ">
          <IoMdPlay /> <span>Play</span>
        </button>
        <button className="hidden md:inline-block bg-gray-500 text-white p-4 px-10 text-lg rounded-lg mx-2">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
