"use client"

import { ShareIcon } from "@heroicons/react/24/outline"

type Props = {
    voidName: string,
    voidId: string
}

const shareVoid = async (voidName: string, voidId: string) => {
    const shareData = {
        title: `${voidName} | The Void`,
        text: `Click the link to join this anonymous void and hop on the discussion. Only you know which messages you send 😉\nOr head to the-void-pi.netlify.app and paste the Void ID for ${voidName}\n\nVoid ID: ${voidId}\n\n`,
        url: `/${voidId}`
    }

    if (navigator.share) {
        try {
            await navigator.share(shareData)
        } catch (err: any) {
            console.log(err.message)
        }
    } else {
        console.log('Can\'t share on this device')
    }
}

export default function ShareButton({ voidName, voidId }: Props) {

    return (
        <button className='p-2 rounded-lg' onClick={() => shareVoid(voidName, voidId)}>
            <ShareIcon className='h-5 w-5 md:h-7 md:w-7' />
        </button>
    )
}