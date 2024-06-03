import Link from "next/link"
import { headers } from 'next/headers'
import { MessageType } from "../[voidId]/components/testMessages"
import { inter } from "./fonts"

type Props = {
    message: MessageType,
    replied?: MessageType,
    setReplying: React.Dispatch<React.SetStateAction<number | undefined>>,
}

export default function Message({ message, replied, setReplying }: Props) {

    const replyActive = (id: number) => {
        const input = document.querySelector<HTMLInputElement>('#message')
        setReplying(id)
        input?.focus()
    }

    return (
        <div id={`${message.id}`} onDoubleClick={() => replyActive(message.id)} className='border rounded-lg p-2 my-1 flex flex-col gap-1 w-fit min-w-[40vw] max-w-[80vw] scroll-mt-40'>
            {replied && (
                <Link href={`#${replied.id}`}>
                    <pre className={`${inter.className} p-2 border rounded-lg line-clamp-3 text-xs text-wrap text-ellipsis`}>{replied.message}</pre>
                </Link>
            )}
            <pre className={`${inter.className} text-sm text-wrap`}>{message.message}</pre>
            <span className='text-[10px] text-gray-400'>{message.datetime}</span>
        </div>
    )
}