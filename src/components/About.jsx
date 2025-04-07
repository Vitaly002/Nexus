import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from './AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    useGSAP(() => {
        const clipAnimation = gsap.timeline({
          scrollTrigger: {
            trigger: "#clip", // trigger once reaches a 'clip' id
            start: "center center", // trigger point, viewport point
            end: "+=800 center", // triggers 800px after it passes the center
            scrub: 0.5, // moving through the animation on scroll
            pin: true, // pin the trigger element while active
            pinSpacing: true,
          },
        });
    
        // Animate to the target (.mask-clip-path) from its current state to the final state
        clipAnimation.to(".mask-clip-path", {
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
        });
    });

    return (
        <div id='about' className='min-h-screen w-screen'>
            <div className='relative mb-8 mt-36 flex flex-col items-center gap-5'>
                <h2 className='font-general text-sm uppercase md:text-[10px]'>
                    Welcome to Zentry
                </h2>

                <AnimatedTitle title="Disc<b>o</b>ver the world's <br /> l<b>a</b>rgest shared adventure" 
                    containerClass='mt-5 !text-black text-center'/>
                
                <div className='about-subtext'>
                    <p>The Game of Games begins-your life, now an epic MMORPG</p>
                    <p className='text-gray-500'>
                        Zentry unites every player from countless games and platforms, both
                        digital and physical, into a unified Play Economy
                    </p>
                </div>
            </div>

            <div className='h-dvh w-screen' id='clip'>
                <div className='mask-clip-path about-image'>
                    <img src="img/about.webp" alt="Background" 
                        className='absolute left-0 top-0 size-full object-cover'/>
                </div>
            </div>
        </div>
    )
}

export default About