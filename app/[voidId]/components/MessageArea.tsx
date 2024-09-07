import { useRef, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import Message from "@/app/ui/Message"
import Hammer from 'hammerjs'
import ToBottom from "@/app/components/ToBottom"
import { Json } from '@/types'
import MediaMessage from '@/app/ui/MediaMessage'
import { fetchMoreMessages } from '@/lib/actions'
import StickerMessage from '@/app/ui/StickerMessage'

type Props = {
    setReplying: React.Dispatch<React.SetStateAction<number | undefined>>,
    setMessages: React.Dispatch<React.SetStateAction<{
        id: number;
        message: string;
        replied: string | null;
        sent_at: string;
        void_id: string;
        is_media: boolean;
        media: Json | null;
    }[]>>,
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

export default function MessageArea({ setReplying, messages, setMessages }: Props) {
    const [atBottom, setAtBottom] = useState(false)

    const topRef = useRef<HTMLDivElement>(null)
    const bottomRef = useRef<HTMLDivElement>(null)
    const loaderRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLTableSectionElement>(null)

    const pathname = usePathname().slice(1)

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    /* check if top div is visible and fetch next batch of messages if in view */
    const topObserver = new IntersectionObserver((entries) => {
        const loader = loaderRef.current!
        entries.forEach(async (entry) => {
            if (entry.isIntersecting) {
                console.log("In Viewport")
                loader.style.display = "flex"
                const lastMessage = topRef.current?.nextSibling as HTMLDivElement

                const { messages, error } = await fetchMoreMessages(pathname, lastMessage.id)
                if (error) loader.style.display = "none"

                loader.style.display = "none"
                setMessages(prev => [...messages, ...prev])
            } else {
                console.log("Not In Viewport")
                loader.style.display = "none"
            }
        })
    })

    useEffect(() => {
        if (topRef.current) topObserver.observe(topRef.current)
    }, [])

    /* scroll to bottom of page only on initial load */
    useEffect(() => {
        scrollToBottom()
        console.log(messages)
    }, [])

    /* toggle scroll to bottom button visibility based on how much user has scrolled from bottom of component */
    useEffect(() => {
        const container = containerRef.current

        const checkAtBottom = () => {
            const awayFromBottom = container?.scrollHeight! - container?.scrollTop! > container?.clientHeight! + 50

            setAtBottom(!awayFromBottom)
        }

        container?.addEventListener('scroll', checkAtBottom)

        /* Initial check */
        checkAtBottom()

        return () => {
            container?.removeEventListener('scroll', checkAtBottom)
        }
    }, [])

    /* swipe gesture funtion with hammerjs */
    useEffect(() => {
        const replyActive = (id: number) => {
            const input = document.querySelector<HTMLInputElement>('#message')
            setReplying(id)
            input?.focus()
        }

        if (typeof window !== 'undefined') {
            const hammer = new Hammer(containerRef.current as HTMLElement)

            let currentMessage: HTMLElement

            hammer.on('swipe', (event) => {
                currentMessage = event.target.closest('.message')!

                if (currentMessage) {
                    replyActive(Number(currentMessage.id))
                }
            })

            /* hammer.on('panright', (event) => {
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
            }) */

            return () => {
                hammer.destroy()
            }
        }
    }, [setReplying])

    return (
        <section id="msg-area" ref={containerRef} className='px-5 mb-16 flex flex-col h-full grow overflow-y-scroll sm:px-8 sm:mb-24 lg:hidden'>
            {messages.length === 0 && (
                <article className='text-center my-auto flex flex-col gap-2'>
                    <p className='font-semibold sm:text-xl'>No messages in this void yet</p>
                    <p className='text-xs text-gray-400 sm:text-base'>Be the first to send a message</p>
                </article>
            )}

            {messages.length !== 0 && (
                <>
                    {/* loader for when previous messages are being fetched */}
                    <div ref={loaderRef} className="hidden justify-center items-center gap-3 pt-20 pb-4">
                        <div className='h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div className='h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                        <div className='h-2 w-2 bg-white rounded-full animate-bounce'></div>
                    </div>

                    {/* div always at the top of all messages to reference the top */}
                    <div ref={topRef}></div>
                </>
            )}

            {messages.length !== 0 && (
                messages.map((message) => {
                    const replied = messages.find(reply => {
                        return reply.id.toString() === message.replied
                    })
                    const messageMedia = message.media as any

                    if (!message.is_media) {
                        return (
                            <Message key={message.id} message={message} replied={replied ?? undefined} setReplying={setReplying} />
                        )
                    } else if (message.is_media && messageMedia.type.includes('webp')) {
                        return (
                            <StickerMessage key={message.id} message={message} replied={replied ?? undefined} />
                        )
                    } else {
                        <MediaMessage key={message.id} message={message} replied={replied ?? undefined} setReplying={setReplying} />
                    }
                })
            )}

            {/* div always at the bottom of all messages to reference the bottom */}
            <div ref={bottomRef}></div>

            <ToBottom scrollFn={scrollToBottom} atBottom={atBottom} />
        </section>
    )
}