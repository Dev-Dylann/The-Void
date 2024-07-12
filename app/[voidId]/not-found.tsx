import Link from "next/link"
import { XCircleIcon } from "@heroicons/react/24/outline"
import { montserrat } from "../ui/fonts"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

export default function NotFound() {
    return (
        <>
            <header className={`${montserrat.className} sticky left-0 top-0 font-semibold flex items-center justify-between px-4 py-2 h-fit text-center shadow-lg bg-darkBg rounded-b-xl z-10`}>
                <Link href='/' className='p-2 rounded-lg'>
                    <ArrowLeftIcon className='h-5 w-5' />
                </Link>
                <h1>Not Found</h1>
                <div className='h-9 w-9 rounded-lg'></div>
            </header>

            <main className='grow p-5 backdrop-blur flex flex-col bg-black/65 items-center justify-center gap-4 text-center'>
                <XCircleIcon className='h-20 w-20' />
                <h2 className={`${montserrat.className} text-xl font-semibold`}>The Void you requested does not exist!</h2>

                <Link href='/' className='mt-2 border rounded-lg font-semibold px-4 py-2 hover:bg-white hover:text-darkBg'>
                    Back
                </Link>
            </main>
        </>
    )
}