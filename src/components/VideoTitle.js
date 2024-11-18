import React from 'react'
import { IoMdPlay } from "react-icons/io";

const VideoTitle = ({title,overview}) => {
  return (
    <div className="pt-[14%] px-14 absolute text-white bg-gradient-to-r from-black w-full aspect-video">
         <h1 className="text-4xl font-bold">{title}</h1>
         <p className='py-6 text-[17px] w-1/4'>{overview}</p>
         <div className='flex'>
            <button className='bg-white text-black p-4 px-10 text-lg rounded-lg flex items-center hover:bg-opacity-80 '><IoMdPlay /> <span>Play</span></button>
            <button className='bg-gray-500 text-white p-4 px-10 text-lg rounded-lg mx-2'>More Info</button>
         </div>
    </div>
  )
}

export default VideoTitle