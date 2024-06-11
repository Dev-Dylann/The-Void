"use client"

import { ShareIcon } from "@heroicons/react/24/outline"
import { usePathname } from "next/navigation"
import notify from "../ui/toast"

type Props = {
    voidName: string,
}

const shareVoid = async (voidName: string, pathname: string) => {
    const shareData = {
        title: `${voidName} | The Void`,
        text: 'Join this anonymous void and hop on the discussion. Only you know which messages you send 😉',
        url: `/${pathname}`
    }

    if (navigator.share) {
        try {
            await navigator.share(shareData)
        } catch (err: any) {
            notify('Share failed', 'error')
        }
    } else {
        console.log('Can\'t share on this device')
        notify('Share API not supported in your browser', 'error')
    }
}

export default function ShareButton({ voidName }: Props) {

    const pathname = usePathname()

    return (
        <button className='p-2 rounded-lg' onClick={() => shareVoid(voidName, pathname)}>
            <ShareIcon className='h-5 w-5' />
        </button>
    )
}