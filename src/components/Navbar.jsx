import Button from './Button';
import React, { useEffect, useRef, useState } from 'react';
import gsap from "gsap";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  // Refs for audio and navigation container
  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();

  // Remove or add a specific class based on the position of the scroll
  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY); // keep track of the last scroll 
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  // Toggle audio and visual indicator (on or off)
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev) 
  }
  // Manage audio playback
  useEffect(() => {
    isAudioPlaying ? audioElementRef.current.play() : audioElementRef.current.pause();
  }, [isAudioPlaying])

  return (
    <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
      <header className='absolute top-1/2 w-full -translate-y-1/2'>
        <nav className='flex size-full items-center justify-between p-4'>
          <div className='flex items-center gap-7'> 
            <img src="/img/logo.png" alt="logo" 
              className='w-10'/>

            <Button
              id='product-button'
              title='Products'
              rightIcon={<TiLocationArrow />}
              containerClass='bg-blue-50 md:flex hidden items-center justify-center gap-1'
            />
          </div>

          <div className='flex h-full items-center'>
            <div className='hidden md:block'>
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className='nav-hover-btn'>
                  {item}
                </a>
              ))}
            </div>

            {/* Audio bars */}
            <button className='ml-10 flex items-center space-x-0.5' onClick={toggleAudioIndicator}>
                <audio ref={audioElementRef} className='hidden' src='/audio/loop.mp3' loop />
                  {[1, 2, 3, 4].map((bar) => (
                    <div key={bar}
                      className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
                      style={{ animationDelay: `${bar * 0.1}s`}}
                    />
                  ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar