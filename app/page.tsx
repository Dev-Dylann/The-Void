import Image from "next/image"
import { astro, inter, montserrat } from "./ui/fonts"
import mobileBg from '/public/mobile-bg.jpg'
import VoidSelection from './components/VoidSelection'

export default function Home() {
  return (
    <main className='relative'>
      <Image
        alt='Background'
        src={mobileBg}
        fill
        quality={100}
        placeholder='blur'
        sizes='100vw'
        className='object-cover bg-fixed -z-[1]'
      />

      <section className='w-full min-h-screen bg-gradient-to-b from-transparent from-10% to-darkBg to-80% p-5 pt-[45vh] flex flex-col text-center'>
        <p className={`${montserrat.className} font-semibold text-lg`}>Welcome to</p>
        <h1 className={`${astro.className} font-semibold text-[65px] -mt-2`}>The Void</h1>

        <p className={`${inter.className} text-sm`}>
          Send messages, images and videos in completely anonymous chatrooms called <span className={`${astro.className}`}>Voids</span>. Only you know which messages you send 😉
        </p>

        <VoidSelection />
      </section>
    </main>
  )
}