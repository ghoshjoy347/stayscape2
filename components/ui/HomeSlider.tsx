"use client";

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import right from "@/public/right.svg"
import left from "@/public/left.svg"

const Slider = ({ images }: {
  images: string[];
}) => {
  const [activeImage, setActiveImage] = useState(0)
  console.log(images)

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
            className={`${idx === activeImage
              ? "block w-[3500px] h-[500px] object-cover transition-all duration-500 ease-in-out"
              : "hidden"
              }`}
            key={idx}>
            <Image src={`https://vlwiwgxhkkamdbzpbxhn.supabase.co/storage/v1/object/public/images/${pic}`} alt={''} width={400} height={400} className='w-full h-[500px] object-cover rounded-3xl rounded-bl-3xl' unoptimized />
          </div>
        ))}

        <button onClick={clickPrev} className="absolute -left-20 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full">
          <Image src={left} alt="Left Arrow" />
        </button>
        <button onClick={clickNext} className="absolute -right-20 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full">
          <Image src={right} alt="Right Arrow" />
        </button>

      </div>

    </div>
  )
}

export default Slider
