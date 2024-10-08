import { astro, inter, montserrat } from "./ui/fonts"
import VoidSelection from './components/VoidSelection'
import { Toaster } from "sonner"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import DesktopWarning from "./ui/DesktopWarning"

export default function Home() {

  return (
    <main className='relative row-span-full flex flex-col max-w-6xl mx-auto'>

      <section className='w-full h-full bg-gradient-to-b from-transparent from-10% to-darkBg to-80% p-5 pb-12 flex flex-col justify-end text-center sm:p-10 sm:pb-16 md:pb-24 md:from-5% md:to-70% lg:flex-row lg:gap-12 lg:justify-between lg:items-center lg:text-left lg:pb-10 lg:p-12 lg:bg-none'>
        <div className="flex flex-col lg:w-1/2">
          <p className={`${montserrat.className} font-semibold text-lg sm:text-2xl`}>Welcome to</p>
          <h1 className={`${astro.className} font-semibold text-[65px] -mt-2 sm:text-[80px]`}>The&nbsp;Void</h1>

          <p className={`${inter.className} text-sm sm:text-lg`}>
            Send messages, images and videos in completely anonymous chatrooms called <span className={`${astro.className}`}>Voids</span>. Only you know which messages you send 😉
          </p>
        </div>

        {/* Join or create void form */}
        <VoidSelection />

        <DesktopWarning />
      </section>

      <Toaster
        theme="dark"
        position="top-right"
        offset={40}
      />

      {/* Vercel Stuff */}
      <SpeedInsights />
      <Analytics />
    </main>
  )
}