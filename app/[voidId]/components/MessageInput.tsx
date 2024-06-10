"use client"

import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { useParams } from "next/navigation"
import { inputNewMessage } from "@/lib/actions"
import { inter } from "@/app/ui/fonts"
import { XMarkIcon, PhotoIcon } from "@heroicons/react/24/outline"
import SendButton from "./SendButton"

type Props = {
    replying: number | undefined,
    setReplying: React.Dispatch<React.SetStateAction<number | undefined>>,
    replied?: {
        id: number;
        message: string;
        replied: string | null;
        sent_at: string;
        void_id: string;
    }
}

const initState = {
    status: ""
}

export default function MessageInput({ replying, setReplying, replied }: Props) {

    const [message, setMessage] = useState('')

    const { voidId } = useParams()

    /* const newMessageArgs = {
        voidId: voidId as string,
        replied: replied?.id.toString()
    }

    const inputNewMessagewithArgs = inputNewMessage.bind(null, newMessageArgs) */
    const [state, formAction] = useFormState(inputNewMessage, initState)

    return (
        <section className='sticky bottom-0 bg-darkBg rounded-t-2xl flex-end w-full py-2 px-3 flex gap-2 z-10'>
            <form action={formAction} className="grid grid-cols-[1fr_auto] w-full gap-2">
                {replying && (
                    <div className='relative p-2 flex flex-col gap-1 text-xs col-span-full text-gray-500 border rounded-lg'>
                        <button type="button" onClick={() => setReplying(undefined)}>
                            <XMarkIcon className='h-4 w-4 absolute top-2 right-2' />
                        </button>
                        Replying to
                        <pre className={`${inter.className} text-white line-clamp-3 text-xs text-wrap text-ellipsis`}>{replied?.message}</pre>
                    </div>
                )}
                <label htmlFor="message" className='absolute -left-[999px]'>
                    Type your message here
                </label>
                <textarea name="message" rows={1} id="message" autoComplete="off" placeholder='Type your message here' value={message} onChange={(e) => setMessage(e.target.value)} className='text-sm bg-transparent outline-none rounded-lg py-2 h-fit self-center px-4 outline outline-2 focus:outline-white -outline-offset-2 grow resize-none' />
                <input type="hidden" name="voidId" value={voidId} />
                <input type="hidden" name="replied" value={replied?.id.toString()} />

                <SendButton message={message} setMessage={setMessage} setReplying={setReplying} formStatus={state.status} />
            </form>

            {!message && (
                <button className='p-3 rounded-lg border bg-darkBg -order-1 h-fit self-end'>
                    <PhotoIcon className='h-5 w-5' />
                </button>
            )}

            {state.status.includes('Failed') && message && (
                <span className='text-red-600 italic absolute bottom-1 left-5 text-[8px]'>Failed to send message!</span>
            )}
        </section>
    )
}