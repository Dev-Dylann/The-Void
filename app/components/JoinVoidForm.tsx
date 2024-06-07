import Link from "next/link"
import { montserrat } from "../ui/fonts"
import { FormEvent, useEffect, useState } from "react"

export default function JoinVoid() {

    const [voidId, setVoidId] = useState('')

    return (
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 pt-6">
            <h2 className={`${montserrat.className} font-semibold text-base`}>Join Existing Void</h2>

            <label htmlFor="voidId" className='flex flex-col gap-1'>
                Void ID:
                <input type="text" name="voidId" id="voidId" value={voidId} onChange={(e) => setVoidId(e.target.value)} placeholder='e.g. "abcDEFghiJ"' required autoFocus className='text-sm bg-transparent outline-none rounded-lg border border-white backdrop-blur py-2 px-4 focus:border-2' />
            </label>

            <Link href={`/${voidId}`}>
                <button className={`${montserrat.className} text-base font-semibold py-2 text-darkBg bg-white rounded-lg w-full`}>
                    Join Void
                </button>
            </Link>
        </form>
    )
}