import React from 'react'
import logo from "../assets/react-flow.png"
import { FaGithub } from "react-icons/fa";


function Navbar({logoName,buttonText}) {
  return (
    <div className='py-3 px-8 flex items-center justify-between shadow-md bg-white'>
        <div className='flex items-center'>
            <div>
              <img src={logo} alt="" className='w-11' />
            </div>
            <div className="px-1">
            <p className=' font-semibold font text-xl'>{logoName}</p>
            </div>
        </div>
        <div className="flex items-center">
            <div className="flex items-center justify-center bg-[#000000] font-light px-5 mr-3 py-2 rounded-xl">
              <FaGithub size={20} color='white'/>
              <button className="ml-2 text-white">GitHub</button>
            </div>
            <div>
              <button className="bg-[#FF338F] text-white font-medium px-5 py-2 rounded-xl">{buttonText}</button>
            </div>
        </div>

        

    </div>
  )
}

export default Navbar