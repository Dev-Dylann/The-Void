import { useRef, useEffect } from 'react'

import testMessages from "./testMessages"
import Message from "@/app/ui/Message"
import ToBottom from "@/app/components/ToBottom"

type Props = {
    setReplying: React.Dispatch<React.SetStateAction<number | undefined>>
}

export default function MessageArea({ setReplying }: Props) {

    const bottomRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [testMessages])

    return (
        <section className='px-5 pt-1 flex flex-col h-screen overflow-y-scroll'>
            {!testMessages.length && (
                <article className='text-center my-auto flex flex-col gap-2'>
                    <p className='font-semibold'>No messages in this void yet</p>
                    <p className='text-xs text-gray-400'>Be the first to send a message</p>
                </article>
            )}

            {testMessages.length && (
                testMessages.map((message) => {
                    const replied = testMessages.find(reply => {
                        return reply.id === message.replied
                    })

                    return (
                        (
                            <Message key={message.id} message={message} replied={replied ?? undefined} setReplying={setReplying} />
                        )
                    )
                })
            )}

            <div ref={bottomRef}></div>

            {/* <ToBottom scrollFn={scrollToBottom} bottomRef={bottomRef} /> */}
        </section>
    )
}