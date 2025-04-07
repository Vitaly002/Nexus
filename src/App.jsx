import React from 'react'
import {About, Hero } from './components';

const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Hero />
      <About />
    </main>
  )
}

export default App