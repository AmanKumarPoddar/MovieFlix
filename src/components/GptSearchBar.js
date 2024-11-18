import React from 'react'
import { useSelector } from 'react-redux'
import lang from '../utils/languageConstants'

const GptSearchBar = () => {
    const langKey = useSelector(store=>store.config.lang)
  return (
    <div className='pt-[8%] flex  justify-center'>
        <form className=' bg-black w-1/2 grid grid-cols-12'>
            <input className='p-3 m-3 col-span-9' type='text' placeholder={lang[langKey].gptSearchPlaceholder}></input>
            <button className='py-2 px-3 m-3 bg-red-700 text-white rounded-lg col-span-3'>{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar