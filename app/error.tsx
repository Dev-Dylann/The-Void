"use client"

import { montserrat } from "./ui/fonts"
import { FaceFrownIcon } from "@heroicons/react/24/outline"

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {

    console.log(error)

    return (
        <section className='p-5 bg-darkBg/65 min-h-screen backdrop-blur flex flex-col gap-2 justify-center items-center text-center'>
            <FaceFrownIcon className='h-20 w-20 ' />
            <h2 className={`${montserrat.className} text-2xl font-semibold`}>Failed to Create Void</h2>

            <button onClick={() => reset()} className='mt-2 border rounded-lg font-semibold px-4 py-2 hover:bg-white hover:text-darkBg'>Try Again</button>
        </section>
    )
}