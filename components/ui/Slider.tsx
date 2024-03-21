"use client";

import React, { useEffect, useState } from 'react'
import { images } from "@/lib/slides_images"
import Image from 'next/image'
import Description from './Description'

const Slider = () => {
  const [activeImage, setActiveImage] = useState(0)


  const clickNext = () => {
    activeImage === images.length - 1
    ? setActiveImage(0)
    : setActiveImage(activeImage + 1)
  }

  const clickPrev = () => {
    activeImage === 0
    ? setActiveImage(images.length - 1)
    : setActiveImage(activeImage - 1)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      clickNext();
    }, 2500);
    return () => {
      clearTimeout(timer);
    }
  }, [activeImage])

  return (
    <div className='grid place-items-center grid-cols-1 w-full mx-auto max-w-5xl my-12 shadow-2xl rounded-2xl'>
        <div className='w-[1350px] h-[] flex justify-center items-center gap-1 transition-transform ease-in-out duration-500 md:rounded-2xl p-6 md:p-0'>
            
            {images.map((pic, idx) => (
                <div 
                className= {`${
                  idx === activeImage
                  ? "block w-[3500px] h-[500px] object-cover transition-all duration-500 ease-in-out"
                  : "hidden"
                }`} 
                key={idx}>
                    <Image src={pic.src} alt={''} width={400} height={400} className='w-full h-[500px] object-cover rounded-tl-3xl rounded-bl-3xl' unoptimized/>
                </div>
            ))}
            
            <Description
            activeImgIndex={activeImage}
            clickNext={clickNext}
            clickPrev={clickPrev}
            />

        </div>
    </div>
  )
}

export default Slider
