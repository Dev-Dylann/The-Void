import { useRef, useEffect, useState } from 'react'

import Message from "@/app/ui/Message"
import ToBottom from "@/app/components/ToBottom"

type Props = {
    setReplying: React.Dispatch<React.SetStateAction<number | undefined>>,
    messages: {
        id: number;
        message: string;
        replied: string | null;
        sent_at: string;
        void_id: string;
    }[]
}

export default function MessageArea({ setReplying, messages }: Props) {
    const [atBottom, setAtBottom] = useState(false)

    const bottomRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLTableSectionElement>(null)

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        const container = containerRef.current

        const checkAtBottom = () => {
            const awayFromBottom = container?.scrollHeight! - container?.scrollTop! > container?.clientHeight! + 100

            setAtBottom(!awayFromBottom)
        }

        container?.addEventListener('scroll', checkAtBottom)

        checkAtBottom()

        return () => {
            container?.removeEventListener('scroll', checkAtBottom)
        }
    }, [])

    return (
        <section ref={containerRef} className='px-5 pt-1 flex flex-col h-fit grow overflow-y-scroll'>
            {!messages.length && (
                <article className='text-center my-auto flex flex-col gap-2'>
                    <p className='font-semibold'>No messages in this void yet</p>
                    <p className='text-xs text-gray-400'>Be the first to send a message</p>
                </article>
            )}

            {messages.length && (
                messages.map((message) => {
                    const replied = messages.find(reply => {
                        return reply.id.toString() === message.replied
                    })

                    return (
                        (
                            <Message key={message.id} message={message} replied={replied ?? undefined} setReplying={setReplying} />
                        )
                    )
                })
            )}

            <div ref={bottomRef} className='border'></div>

            <ToBottom scrollFn={scrollToBottom} atBottom={atBottom} />
        </section>
    )
}