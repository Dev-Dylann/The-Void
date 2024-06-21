import { astro, inter, montserrat } from "./ui/fonts"
import VoidSelection from './components/VoidSelection'
import { ToastContainer, Zoom } from "react-toastify"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

import 'react-toastify/ReactToastify.css'

export default function Home() {

  return (
    <main className='relative row-span-full flex flex-col'>

      <section className='w-full h-full bg-gradient-to-b from-transparent from-10% to-darkBg to-80% p-5 pb-12 flex flex-col justify-end text-center'>
        <p className={`${montserrat.className} font-semibold text-lg`}>Welcome to</p>
        <h1 className={`${astro.className} font-semibold text-[65px] -mt-2`}>The Void</h1>

        <p className={`${inter.className} text-sm`}>
          Send messages, images and videos in completely anonymous chatrooms called <span className={`${astro.className}`}>Voids</span>. Only you know which messages you send 😉
        </p>

        <VoidSelection />
      </section>

      <ToastContainer
        autoClose={2500}
        position="top-center"
        hideProgressBar={true}
        limit={3}
        theme="dark"
        transition={Zoom}
        newestOnTop={false}
      />
      <SpeedInsights />
      <Analytics />
    </main>
  )
}