import { Button } from '@heroui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
function Hero() {
  return (
    <div className='px-10 md:px-28 lg:px-44 mt-10 h-screen'>
        <div className='grid grid-cols-1 md:grid-cols-2 '>
            <div>
                <h2 className='text-[50px] text-primary font-extrabold py-10'>Craft Magical Stories for Kids in Minutes</h2>
                <p className='text-2xl text-primary font-light font-sans'>Create a personalized,engaging and fun stories for childrens.Your kids will fall in love with the stories.</p>
                <Link href={'/create-story'}>
                <Button size='lg' color='primary' className='mt-5'>Create..</Button>
                </Link>
            </div>
            <div>
                <Image src={'/tl.webp'} alt='hero' width={700} height={600}/>
            </div>

        </div>
    </div>
  )
}
export default Hero;