import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Flow from './components/Flow'
function App() {
  return (
    <div className='h-full w-full '>
      <Navbar 
        logoName="Nexus"
        buttonText="About"
      />
      <div className='flex h-full items-center px-10  justify-center'>
        <Hero
          heading1="Wire Your Ideas with "
          heading2='Nexus'
          description='A tool for visualizing and navigating complex project structures and files.'
          button3='Get Started'
          className="w-2/5 h-full bg-white "
        />
        <Flow
          className='w-3/5'/>
      </div>
    </div>
  )
}

export default App