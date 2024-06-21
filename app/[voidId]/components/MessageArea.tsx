import { useRef, useEffect, useState } from 'react'

import Message from "@/app/ui/Message"
import Hammer from 'hammerjs'
import ToBottom from "@/app/components/ToBottom"
import { Json } from '@/types'
import MediaMessage from '@/app/ui/MediaMessage'

type Props = {
    setReplying: React.Dispatch<React.SetStateAction<number | undefined>>,
    messages: {
        id: number;
        message: string;
        replied: string | null;
        sent_at: string;
        void_id: string;
        is_media: boolean;
        media: Json | null;
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
        console.log(messages)
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

    useEffect(() => {
        const replyActive = (id: number) => {
            const input = document.querySelector<HTMLInputElement>('#message')
            setReplying(id)
            input?.focus()
        }

        if (typeof window !== 'undefined') {
            const hammer = new Hammer(containerRef.current as HTMLElement)

            let currentMessage: HTMLElement

            hammer.on('panright', (event) => {
                currentMessage = event.target.closest('.message')!
                if (currentMessage) {
                    currentMessage.style.transform = `translateX(${event.deltaX})`
                }
            })

            hammer.on('panend', (event) => {
                if (currentMessage) {
                    if (event.deltaX > 100) {
                        navigator.vibrate(100)
                        replyActive(Number(currentMessage.id))
                    } else {
                        currentMessage.style.transform = `translateX(0)`
                    }
                }
            })

            return () => {
                hammer.destroy()
            }
        }
    }, [setReplying])

    return (
        <section ref={containerRef} className='px-5 pt-1 flex flex-col h-full grow overflow-y-scroll'>
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

                    if (!message.is_media) {
                        return (
                            <Message key={message.id} message={message} replied={replied ?? undefined} setReplying={setReplying} />
                        )
                    } else {
                        return (
                            <MediaMessage key={message.id} message={message} replied={replied ?? undefined} setReplying={setReplying} />
                        )
                    }
                })
            )}

            <div ref={bottomRef}></div>

            <ToBottom scrollFn={scrollToBottom} atBottom={atBottom} />
        </section>
    )
}