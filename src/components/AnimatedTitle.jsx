import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react';
import { gsap } from "gsap";

const AnimatedTitle = ({title, containerClass}) => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const titleAnimation = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "100 bottom",
            end: "center bottom",
            // onEnter, onLeave, onEnterBack, onLeaveBack
            toggleActions: "play none none reverse", // want an animation to play once when scrolling forward and never get reset or replayed
          },
        });
      
        titleAnimation.to(".animated-word", {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.02,
        }, 0);
      }, { scope: containerRef }); // scope for refs
    

    return (
        // Animates each word individually
        <div ref={containerRef} className={`animated-title ${containerClass}`}>
            {title.split('<br />').map((line, index) => (
                <div key={index} className='flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3'>
                    {line.split(' ').map((word, i) => (
                        <span key={i} className='animated-word'
                            dangerouslySetInnerHTML={{__html: word}} />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default AnimatedTitle