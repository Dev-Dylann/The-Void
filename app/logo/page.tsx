import Image from "next/image"
import logoImg from '@/public/og-pic.jpg'
import { astro } from "../ui/fonts"

export default async function Logo() {
    return (
        <main className={`${astro.className} relative bg-darkBg/20 bg-[url("/og-pic.jpg")] h-screen w-screen bg-cover flex flex-col items-center justify-center`}>
            <span className='text-3xl'>THE</span>
            <span className='text-[100px] -mt-8'>VOID</span>
        </main>
    )
}