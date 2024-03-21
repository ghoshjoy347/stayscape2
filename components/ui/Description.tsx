import React from 'react'
import { images } from '@/lib/slides_images'
import right from "@/public/right.svg"
import left from "@/public/left.svg"
import Image from 'next/image'



    type Props = {
        clickNext:any,
        clickPrev:any,
        activeImgIndex:any
    }
    const Description = ({clickNext, clickPrev, activeImgIndex }:Props) => {


  return (
    <div className='grid place-items-start w-full bg-[#e7dfd9] relative md:rounded-tr-3xl rounded-br-3xl'>
        <div className='uppercase text-sm absolute right-4 top-2 underline-offset-4 underline'>StayScape</div>
        {images.map((elem,idx) => (
            <div 
            key={idx} 
            className={`${
                idx === activeImgIndex 
                ? `block w-full h-[500px] object-cover transition-all duration-500 ease-in-out` 
                : 'hidden'}`} >

                <div className='py-14 text-4xl font-semibold ml-5'>{elem.title}</div>
                <div className='leading-relaxed font-medium ml-4 text-base tracking-wide h-40 italic text-gray-600 mr-2'>
                    {" "}
                    {elem.desc}
                    </div>

                <button className='bg-[#eca7e] text-white uppercase px-4 text-zinc-500 py-8 rounded-md my-10'>Read More</button>

                <div className='absolute bottom-1 w-full flex justify-center items-center'>
                    <div onClick={clickPrev} className='absolute bottom-2 right-10 cursor-pointer'>
                        <Image src={left} alt='' width={30} height={30}/>
                    </div>

                    <div onClick={clickNext} className='absolute bottom-2 right-2 cursor-pointer'>
                        <Image src={right} alt='' width={30} height={30}/>
                    </div>
                </div>

            </div>
        ))}
    </div>
  )
}

export default Description