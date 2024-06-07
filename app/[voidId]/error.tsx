"use client"

import { montserrat } from "../ui/fonts"
import { FaceFrownIcon } from "@heroicons/react/24/outline"

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
    return (
        <>
            <header className={`${montserrat.className} sticky left-0 top-0 font-semibold text-center p-4 shadow-lg bg-darkBg rounded-b-xl z-10`}>
                <h1>Error</h1>
            </header>

            <main className='grow p-5 flex bg-black/65 items-center justify-center gap-4 text-center'>
                <FaceFrownIcon className='h-16 w-16' />
                <h2 className={`${montserrat.className} text-2xl font-semibold`}>Couldn't fetch messages!</h2>

                <button onClick={() => reset()} className='mt-2 border rounded-lg font-semibold px-4 py-2 hover:bg-white hover:text-darkBg'>Try Again</button>
            </main>
        </>
    )
}