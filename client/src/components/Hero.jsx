import React from 'react'

function Hero({button3,heading1, heading2, description}) {
  return (
    <div className=' h-full flex flex-col '>
        <div>
            <span className='font-sans font-semibold  tracking-tighter text-6xl'>{heading1} <span className='text-[#FF338F]'>{heading2}</span></span>
        </div>
        <div className='mt-3'>
            <p className='font-normal text-lg leading-8'>{description}</p>
        </div>
        <div className='mt-3'>
            <button className='bg-[#FF338F] text-white poppins-medium px-7 py-2 rounded-full shadow-lg'>{button3}</button>
        </div>
    </div>
  )
}

export default Hero