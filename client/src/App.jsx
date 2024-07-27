import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
function App() {
  return (
    <div className='h-full w-full'>
      <Navbar 
        logoName="Nexus"
        buttonText="About"
      />
      <div className='flex h-full items-center  border justify-center'>
        <Hero
          heading1="Wire Your Ideas with "
          heading2='Nexus'
          description='A tool for visualizing and navigating complex project structures and files.'
          button3='Get Started'
        />
      </div>
    </div>
  )
}

export default App