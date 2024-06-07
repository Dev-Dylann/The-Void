import Link from "next/link"
import { XCircleIcon } from "@heroicons/react/24/outline"
import { montserrat } from "../ui/fonts"

export default function NotFound() {
    return (
        <section className='p-5 bg-darkBg/65 min-h-screen backdrop-blur flex flex-col gap-2 justify-center items-center text-center'>
            <XCircleIcon className='h-20 w-20' />
            <h2 className={`${montserrat.className} text-xl font-semibold`}>The Void you requested does not exist!</h2>

            <Link href='/' className='mt-2 border rounded-lg font-semibold px-4 py-2 hover:bg-white hover:text-darkBg'>
                Back
            </Link>
        </section>
    )
}