"use client"

import { useState, useEffect } from "react"
import { inter } from "@/app/ui/fonts"
import { PaperAirplaneIcon, XMarkIcon, PhotoIcon } from "@heroicons/react/24/outline"
import testMessages from "./testMessages"

type Props = {
    replying: number | undefined,
    setReplying: React.Dispatch<React.SetStateAction<number | undefined>>
}

export default function MessageInput({ replying, setReplying }: Props) {

    const [message, setMessage] = useState('')

    const replied = testMessages.find(message => {
        return message.id === replying
    })

    return (
        <section className='sticky bottom-0 bg-darkBg rounded-t-2xl flex-end w-full p-2 flex gap-2'>
            {/* <form className='w-full'>
                {replying && (
                    <div className='relative p-2 flex flex-col gap-1 text-xs text-gray-500 border rounded-lg'>
                        <button onClick={() => setReplying(undefined)}>
                            <XMarkIcon className='h-4 w-4 absolute top-2 right-2' />
                        </button>
                        Replying to
                        <pre className={`${inter.className} text-white line-clamp-3 text-xs text-wrap text-ellipsis`}>{replied?.message}</pre>
                    </div>
                )}

                <label htmlFor="message" className='absolute -left-[999px]'>
                    Type your message here
                </label>
                <input type="text" name="message" id="message" placeholder='Type your message here' value={message} onChange={(e) => setMessage(e.target.value)} className='text-sm bg-darkBg outline-none rounded-lg border border-white py-2 px-4 focus:border-2 w-full' />
            </form> */}

            <form className="grid grid-cols-[1fr_28px] w-full gap-2">
                {replying && (
                    <div className='relative p-2 flex flex-col gap-1 text-xs col-span-full text-gray-500 border rounded-lg'>
                        <button onClick={() => setReplying(undefined)}>
                            <XMarkIcon className='h-4 w-4 absolute top-2 right-2' />
                        </button>
                        Replying to
                        <pre className={`${inter.className} text-white line-clamp-3 text-xs text-wrap text-ellipsis`}>{replied?.message}</pre>
                    </div>
                )}
                <label htmlFor="message" className='absolute -left-[999px]'>
                    Type your message here
                </label>
                <input type="text" name="message" id="message" placeholder='Type your message here' value={message} onChange={(e) => setMessage(e.target.value)} className='text-sm bg-transparent outline-none rounded-lg py-2 px-4 outline outline-2 focus:outline-white -outline-offset-2 grow' />

                <button className='p-2 rounded-lg text-darkBg bg-white w-fit'>
                    <PaperAirplaneIcon className='h-5 w-5' />
                </button>
            </form>

            {!message && (
                <button className='p-2 rounded-lg border bg-darkBg -order-1 h-fit self-end'>
                    <PhotoIcon className='h-5 w-5' />
                </button>
            )}
        </section>
    )
}