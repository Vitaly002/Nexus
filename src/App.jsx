import React from 'react'
import { About, Features, Hero, Navbar } from './components';

const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Navbar />
      <Hero />
      <About />
      <Features />
    </main>
  )
}

export default App