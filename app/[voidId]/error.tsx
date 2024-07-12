"use client"

import { montserrat } from "../ui/fonts"
import Link from "next/link"
import { FaceFrownIcon, ArrowLeftIcon } from "@heroicons/react/24/outline"

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
    return (
        <>
            <header className={`${montserrat.className} sticky left-0 top-0 font-semibold flex items-center justify-between px-4 py-2 h-fit text-center shadow-lg bg-darkBg rounded-b-xl z-10`}>
                <Link href='/' className='p-2 rounded-lg'>
                    <ArrowLeftIcon className='h-5 w-5' />
                </Link>
                <h1>Error</h1>
                <div className='h-9 w-9 rounded-lg'></div>
            </header>

            <main className='grow p-5 flex flex-col bg-black/65 items-center justify-center gap-4 text-center'>
                <FaceFrownIcon className='h-16 w-16' />
                <h2 className={`${montserrat.className} text-2xl font-semibold`}>Couldn&apos;t fetch messages!</h2>

                <button onClick={() => reset()} className='mt-2 border rounded-lg font-semibold px-4 py-2 hover:bg-white hover:text-darkBg'>Try Again</button>
            </main>
        </>
    )
}